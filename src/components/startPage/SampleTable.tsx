import { useState, useEffect } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import CommonTable from '../commonTable/CommonTable'
import { getSampleTableData, SampleTableData } from '../../lib/actions'

const SampleTable = () => {
    const [tableData, setTableData] = useState<SampleTableData[]>([])
    const columnHelper = createColumnHelper<SampleTableData>()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSampleTableData()
            setTableData(data)
        }
        fetchData()
    }, [])

    
    const renderBadgeColor = (status: string) => {
        switch (status) {
            case 'online':
                return 'bg-green-200 text-green-800'
            case 'offline':
                return 'bg-red-200 text-red-800'
            case 'away':
                return 'bg-yellow-200 text-yellow-800'
            case 'vacation':
                return 'bg-blue-200 text-blue-800'
            default:
                return 'bg-gray-200 text-gray-800'
        }
    }
    const renderProgressBar = (progress: number|null) => {
        const percent = progress || 0
        const renderColor = (progress: number) => {
            if (progress < 30) {
                return 'progress-danger'
            } else if (progress < 80) {
                return 'progress-primary'
            } else {
                return 'progress-success'
            }
        }
        return (
            <div className='w-full'>
            <div className='text-3xs flex justify-end text-slate-400 mb-1'>{progress}%</div>
            <div className={`progress ${renderColor(percent)}`}>
                <div className='progress-bar' style={{ width: `${percent}%` }}></div>
            </div>
            </div>
        )
    }



    const columns = [
        columnHelper.accessor('firstName', {
            cell: info => info.getValue(),
            header: () => <span>First Name</span>            
        }),
        columnHelper.accessor(row => row.lastName, {
            id: 'lastName',
            cell: info => <span>{info.getValue()}</span>,
            header: () => <span>Last Name</span>
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => (
                <span className={`badge badge-xs ${renderBadgeColor(info.getValue())}`}>
                    {info.getValue()}
                </span>
            ),
            // footer: info => info.column.id,
            footer: () => {
                const onlineUsers = tableData.filter(row => row.status === 'online').length;
                return <span>Online Users: {onlineUsers}</span>;
            },

        }),
        columnHelper.accessor('age', {
            header: () => 'Age',
            cell: info => info.renderValue(),
            footer: () => {
                const totalAge = tableData.reduce((sum, row) => sum + row.age, 0)
                const minAge = Math.min(...tableData.map(row => row.age))
                const maxAge = Math.max(...tableData.map(row => row.age))
                const averageAge = (totalAge / tableData.length).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 });
                return (
                    <div>
                        <ul>
                            <li>min:{minAge}</li>
                            <li>max:{maxAge}</li>
                            <li>avg: {averageAge}</li>
                        </ul>
                    </div>
                )
            },

        }),
        columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
        }),
        columnHelper.accessor('progress', {
            // can make use of tailwindcss to hide the column for responsive design
            header: () => <span className='hidden md:flex'>Progress</span>,
            cell: info => (<span className='hidden md:flex'>{renderProgressBar(info.renderValue())}</span>),
        }),
    ]
    return (
        <div className='card w-full mt-4'>
            <div className='card-header'>
                <h1 className='text-xl'>Sample Table</h1>
            </div>
            <div className='card-body'>
                <CommonTable columns={columns} defaultData={tableData} />
            </div>
        </div>
    )
}

export default SampleTable;