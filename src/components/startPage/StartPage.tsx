import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SampleTable from './SampleTable';
import { getSampleTableData, SampleTableData } from '../../lib/actions'

const StartPage = () => {
    const [tableData, setTableData] = useState<SampleTableData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSampleTableData()
            setTableData(data)
        }
        fetchData()
    }, [])




    return (
        <div className='flex flex-col items-center mx-4'>
            <SearchForm setTableData={setTableData}/>
            <SampleTable tableData={tableData}/>
        </div>
    );
}
export default StartPage;