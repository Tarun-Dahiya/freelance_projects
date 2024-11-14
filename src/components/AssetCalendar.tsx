import {FC, useState, useCallback, useEffect, useRef} from "react"
import { Link } from "react-router-dom"
import {Calendar, momentLocalizer} from "react-big-calendar"
import { useFloating, offset, flip, shift, arrow } from "@floating-ui/react"
import axios from "axios"
import moment from "moment/moment.js"
import 'react-big-calendar/lib/css/react-big-calendar.css'

interface Event {
    EVENTID : number
    WHO: string
    ATTENDEES: string | null
    LOCATION: string
    STARTDATE: string
    ENDDATE: string
    EVENTNOTE: string
    ASSETID: number
    ASSETNAME: string
    ASSETTYPE: string
    HOMEFACILITY: string
}

const EventTable = ({ events }: { events: Event[] }) => {
    return (
        <div>
            <table className="w-full table-auto">
            <thead>
                <tr>
                <th className="w-[80px] max-w-[80px] text-xs">Asset</th>
                <th className="text-xs">Who</th>
                <th className="text-xs"># Attend</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                // <tr key={event.EVENTID}>
                //     <td className="w-[80px] max-w-[80px] text-xs break-words overflow-hidden">{event.ASSETNAME}</td>
                //     <td className="text-xs">{event.WHO}</td>
                //     <td className="text-xs">{event.ATTENDEES || ''}</td>
                // </tr>
                <EventRow event={event} key={event.EVENTID} />
                ))}
            </tbody>
            </table>
        </div>
    )
}

const EventRow = ({ event }: { event: Event }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const arrowRef = useRef<HTMLDivElement | null>(null);
  
    const { x, y, refs, strategy } = useFloating({
        placement: 'bottom',
        middleware: [offset(10), flip(), shift({ padding: 5 }), arrow({ element: arrowRef.current })],
    })
  
    return (
        <tr
            key={event.EVENTID}
            className="group relative cursor-pointer"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(true)}
        >
        <td ref={refs.setReference} className="text-xs break-words">
          {event.ASSETNAME}
        </td>
        <td className="text-xs">{event.WHO}</td>
        <td className="text-xs">{event.ATTENDEES || ''}</td>
  
        {/* Floating Menu */}
        {showMenu && (
            <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 10,
            }}
            className="bg-white shadow-lg border rounded p-2"
            >
            <div 
                ref={arrowRef} 
                className="absolute w-3 h-3 bg-white rotate-45 border-t border-l border-gray-300"
                style={{
                left: '50%',
                top: '-5px',
                transform: 'translateX(-50%)',
                }}
            />
            <div className="d-flex flex-column">
                <div className="text-xs">
                    <span>What:</span> {event.ASSETNAME}
                </div>
                <div className="text-xs">
                    <span>When:</span> {event.STARTDATE} - {event.ENDDATE}
                </div>
                <div className="text-xs">
                    <span>Who:</span> {event.WHO}
                </div>
                <div className="text-xs">
                    <span>Note:</span> {event.EVENTNOTE}
                </div>
                <div className="text-xs">
                    <Link to={`/addEvent/${event.EVENTID}`}>Modify Event</Link>
                </div>
            </div>
          </div>
        )}
      </tr>
    );
  };

const AssetCalendar: FC = () => {

    const [events, setEvents] = useState<Event[]>([])

    const localizer = momentLocalizer(moment)

    useEffect(() => {   
        const fetchEvents = async () => {
            const response = await axios.get(`/webservices/assetScheduling2/api/calendar.cfc?method=getEvents`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            setEvents(response.data)
        }
        fetchEvents()
    },[])

    const getFirstDateOfCurrentMonth = (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth(), 1)
    };

    // Utility function to get the first date of the next month
    const getFirstDateOfNextMonth = (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1)
    };

    const getLatestEvents = useCallback(
        async (startDate: Date, endDate: Date) => {

        const startDateString = moment(startDate).format('MM/DD/YYYY')
        const endDateString = moment(endDate).format('MM/DD/YYYY')

        if (!startDateString || !endDateString) {
            return
        }

        try{
            const response = await axios.post(`/webservices/assetScheduling2/api/calendar.cfc?method=getEventsByMonth`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                },
                data: {
                    startDate: startDateString,
                    endDate: endDateString
                }
            })
            const events = await response.data
            setEvents(events)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const handleNavigate = useCallback((date: Date, view: string) => {
        const newStartDate = getFirstDateOfCurrentMonth(date); // Get the start date of the current month
        const newEndDate = getFirstDateOfNextMonth(date); // Get the start date of the next month (as the end date)
        getLatestEvents(newStartDate, newEndDate)
        
       
    }, [getLatestEvents])

    const CustomEvent = ({ event }: { event: Event }) => {
        // Group events by their start date (or any other property as necessary)
        const groupedEvents = events.filter((e) => {
            const eventStartDate = moment(e.STARTDATE).format("MM/DD/YYYY")
            const calendarEventStartDate = moment(event.STARTDATE).format("MM/DD/YYYY")
            return eventStartDate === calendarEventStartDate
        })
    
        return (
            <div>
                <EventTable events={groupedEvents} />
            </div>
        )
    }


    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="STARTDATE"
            endAccessor="ENDDATE"
            style={{height: "90vh", width: "95vw"}}
            views={['month']}
            onNavigate={handleNavigate}
            components={{
                event: CustomEvent,
            }}
            popup
        />
    )
}

export default AssetCalendar