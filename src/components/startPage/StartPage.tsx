import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SampleTable from './SampleTable';
import AssetCalendar from '../AssetCalendar';  
import LoadingPage from '../loadingPage/LoadingPage';
import { getSampleTableData, SampleTableData, getEvents, Event } from '../../lib/actions'

type SearchValues = {
    firstName?: string
    lastName?: string
    age?: number
    visits?: number
    status?: string
    progress?: number
}

const StartPage = () => {
    const [searchValues, setSearchValues] = useState<SearchValues>({})
    const [tableData, setTableData] = useState<SampleTableData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [events, setEvents] = useState<Event[]>([])

    const handleEmailCSV = (val: SearchValues) => {
        // This function will be called when the user clicks the "Email CSV" button
        // replace with your implementation
        alert(JSON.stringify(val))
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await getSampleTableData()
            setTableData(data)
            setIsLoading(false)
        }
        fetchData()
    }, [searchValues])

    useEffect(() => {   
        const fetchEvents = async () => {
            setIsLoading(true)
            const data = await getEvents()
            setEvents(data)
            setIsLoading(false)
        }
        fetchEvents()
    },[])

    return (
        <>
            {isLoading ?
                (<LoadingPage />) :
                (<div className='flex flex-col items-center mx-4'>
                    {/* <SearchForm setSearchValues={setSearchValues} handleEmailCSV={handleEmailCSV} />
                    <SampleTable tableData={tableData} /> */}
                    <AssetCalendar events={events} />
                </div>)
            }
        </>
    );
}
export default StartPage;