import {Calendar, momentLocalizer} from "react-big-calendar"
import {Event} from "../lib/actions"
import moment from "moment/moment.js"
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function AssetCalendar({events}:{events:Event[]}) {

    const localizer = momentLocalizer(moment)

    //custom event colors for react big calendar
    // interface EventPropGetter {
    //     style: {
    //         backgroundColor: string;
    //     };
    // }

    // const eventPropGetter = (event: Event): EventPropGetter => {
    //     return {
    //         style: {
    //             backgroundColor: event.bgColor
    //         }
    //     }
    // }

    return (
        <Calendar
            localizer={localizer}
            events={events}
            style={{height: "90vh", width: "95vw"}}
            views={['month', 'week', 'agenda']}
            // eventPropGetter={eventPropGetter}
            popup
        />
    )
}