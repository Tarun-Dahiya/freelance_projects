import { FC, useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import { AssetMember, getAssetMembers } from '../lib/actions.ts'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css';

const AddEvent: FC = () => {

    const [startDate, setStartDate] = useState<Date | null>(null)
    const [startTime, setStartTime] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [endTime, setEndTime] = useState<string | null>(null)
    const [userName, setUserName] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [numPeople, setNumPeople] = useState<string>("")
    const [room, setRoom] = useState<OptionType | null>(null);
    const [notes, setNotes] = useState<string>("")
    const [warning, setWarning] = useState<boolean>(false)
    const [assetMembers, setAssetMembers] = useState<AssetMember[]>([])

    type OptionType = { value: string; label: string };

    type DatePickerProps = {
        selectedDate: Date | null;
        onDateChange: (date: Date | null) => void;
    };

    useEffect(() => {
        let storedUser = sessionStorage.getItem('user')
        if(storedUser) {
            try {
                let parsedUser = JSON.parse(storedUser)
                setUserName(parsedUser.USERNAME)
            } catch (error) {
                console.error(error)
            }
        }

        setStartTime("8:00 AM")
        setEndTime("5:00 PM")

        console.log(`Now calling getAssetMembers`)

        const fetchAssetMembers = async () => {
            const data: AssetMember[] = await getAssetMembers()
            setAssetMembers(data)
        }
        fetchAssetMembers()
    },[])

    const options: OptionType[] = assetMembers?.map((member) => ({
        value: member.ASSETID.toString(),
        label: `${member.HOMEFACILITY} | ${member.ASSETTYPE} | ${member.ASSETNAME}`
    }));

    const generateTimeSlots = () => {
        const slots = [];
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0); // Start at 12:00 AM
    
        for (let i = 0; i < 24 * 4; i++) {  // 24 hours, with 4 intervals (15 mins each)
          const time = new Date(startTime.getTime() + i * 15 * 60 * 1000); // Add 15 minutes
          const hours = time.getHours();
          const minutes = time.getMinutes();
          const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
          slots.push(formattedTime);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots()
    

    const submit = () => {
        if (userName === "" && location === "" && numPeople === "" && notes === "") {
            setWarning(true)
            toast(<div className='d-flex flex-column'>
                    <h3>Warning</h3>
                    <label>Please fill in required feilds</label>
                </div>, 
                {type: 'warning'}
            )
        } else {
            // Add your submit logic here
            setWarning(true)
            toast(<div className='d-flex flex-column'>
                <h3>Success</h3>
                <label>Event Saved</label>
            </div>, 
            {type: 'success'}
        )
        }
    }

    const handleRoomChange = (selected: OptionType | null) => {
        if (selected) {
            setRoom(selected)
            checkAvail(selected)
        }
    }

    const checkAvail = (selected: OptionType) => {
        if(startDate && endDate && startTime && endTime && selected) {
            console.log(`Checking availability for room ${selected.label} from ${startDate} ${startTime} to ${endDate} ${endTime}`)
        }
    }

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date)
    }

    const handleEndTimeChange = (time: OptionType | null) => {
        if (time) {
            setEndTime(time.value)
            console.log('Selected option:', time)
        }
    }

    const handleStartTimeChange = (time: OptionType | null) => {
        if (time) {
            setStartTime(time.value)
            console.log('Selected option:', time)
        }
    }


    return (
        <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] 2xl:max-w-[85%] ml-auto mr-auto" 
            data-stepper="false" id="addEvent"
        >
            {warning && <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />}
            <div className="card">
                <div className="card-header flex justify-between items-center gap-4 py-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Add New User</h2>
                </div>
                <div className="card-body py-16">
                    <input type='hidden' name='eventid' id='eventid' />
                    <div className="flex flex-col items-center justify-center text-3xl font-semibold text-gray-900 gap-5 xl:gap-10">
                        <div className="w-full items-center flex flex-row justify-center gap-2.5">
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-1.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    Start Date
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>
                                <DatePicker
                                    selected={startDate} 
                                    onChange={handleStartDateChange}
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="Select a date"
                                    showMonthDropdown
                                    showYearDropdown
                                    scrollableYearDropdown
                                    className="px-4 py-2 w-full border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" 
                                    popperClassName="z-50" // To ensure the calendar is visible above other elements
                                />
                            </div>
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-1.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    Time
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>
                                <Select<OptionType>
                                    classNames={{ 
                                        control: () => 'dark:bg-light-active dark:border-black',
                                        menu: () => 'dark:bg-light-active dark:border-black',
                                        option: () => 'dark:text-slate-300 dark:bg-light-active dark:hover:bg-gray-400',
                                        input: () => 'dark:text-slate-300',
                                        placeholder: () => 'dark:text-slate-300',
                                        singleValue: () => 'dark:text-slate-300',
                                    }}
                                    className="select p-0 border-0 w-60"
                                    options={timeSlots.map((time) => ({ value: time, label: time }))}
                                    onChange={handleStartTimeChange}
                                />
                            </div>
                        </div>
                        <div className="w-full items-center flex flex-row justify-center gap-2.5">
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-1.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    End Date
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>
                                <DatePicker
                                    selected={endDate} 
                                    onChange={handleEndDateChange} 
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="Select a date"
                                    showMonthDropdown
                                    showYearDropdown
                                    scrollableYearDropdown
                                    className="px-4 py-2 w-full border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" 
                                    popperClassName="z-50" // To ensure the calendar is visible above other elements
                                />
                            </div>
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-1.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    Time
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>
                                <Select<OptionType>
                                    classNames={{ 
                                        control: () => 'dark:bg-light-active dark:border-black',
                                        menu: () => 'dark:bg-light-active dark:border-black',
                                        option: () => 'dark:text-slate-300 dark:bg-light-active dark:hover:bg-gray-400',
                                        input: () => 'dark:text-slate-300',
                                        placeholder: () => 'dark:text-slate-300',
                                        singleValue: () => 'dark:text-slate-300',
                                    }}
                                    className="select p-0 border-0 w-60"
                                    options={timeSlots.map((time) => ({ value: time, label: time }))}
                                    onChange={handleEndTimeChange}
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-32">
                                    Who
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>
                                <input className="input" name="fName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                               
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-32">
                                    Where
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>
                                <input className="input" name="lName" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                        </div>                   
                        <div className="w-1/2">
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-32">
                                    People Attending
                                </label>
                                <input className="input" name="fName" type="text" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-32">
                                    What
                                </label>
                                <Select
                                    id='assetid'
                                    classNames={{ 
                                        control: () => 'dark:bg-light-active dark:border-black',
                                        menu: () => 'dark:bg-light-active dark:border-black',
                                        option: () => 'dark:text-slate-300 dark:bg-light-active dark:hover:bg-gray-400',
                                        input: () => 'dark:text-slate-300',
                                        placeholder: () => 'dark:text-slate-300',
                                        singleValue: () => 'dark:text-slate-300',
                                    }}
                                    className="select p-0 border-0 w-60"
                                    options={options}
                                    onChange={handleRoomChange}
                                    value={room}
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label max-w-32">
                                    Notes
                                </label>
                                <input className="input" name="fName" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer py-8 flex justify-between">
                    <div>
                        <button className="btn btn-primary stepper-last:inline-flex" onClick={() => submit()}>
                            Save Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEvent;