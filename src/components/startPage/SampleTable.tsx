import { useState, useEffect } from 'react'
import { createColumnHelper, Row } from '@tanstack/react-table'
import CommonTable from '../commonTable/CommonTable'
import { getSampleTableData, SampleTableData } from '../../lib/actions'

const SampleTable = () => {
    const [tableData, setTableData] = useState<SampleTableData[]>([])
    const [selectedRows, setSelectedRows] = useState<SampleTableData[]>([])
    const columnHelper = createColumnHelper<SampleTableData>()

    const selectedIdx = Object.keys(selectedRows).map(id => parseInt(id))
    const selectedData = tableData.filter((_, idx) => selectedIdx.includes(idx))

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
                return 'badge badge-sm badge-outline badge-success'
            case 'offline':
                return 'badge badge-sm badge-outline badge-danger'
            case 'away':
                return 'badge badge-sm badge-outline badge-warning'
            case 'vacation':
                return 'badge badge-sm badge-outline badge-info'
            default:
                return 'badge badge-sm badge-outline badge-secondary'
        }
    }
    const renderProgressBar = (progress: number | null) => {
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
            header: () => <span>First Name</span>,
        }),
        columnHelper.accessor(row => row.lastName, {
            id: 'lastName',
            cell: info => <span>{info.getValue()}</span>,
            header: () => <span>Last Name</span>,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => (
                <span className={`badge badge-xs ${renderBadgeColor(info.getValue())}`}>
                    {info.getValue()}
                </span>
            ),
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
            header: () => <span className='hidden md:inline-block'>Progress</span>,
            cell: info => (<span className='hidden md:flex'>{renderProgressBar(info.renderValue())}</span>),
        }),
        {
            id: 'actions',
            cell: (props: { row: { original: { firstName: string, lastName: string } } }) => {
                const firstName = props.row.original.firstName
                const lastName = props.row.original.lastName
                return (
                    <button onClick={() => alert(`${firstName} ${lastName}`)} className='hidden md:flex btn btn-sm btn-outline btn-warning gap-2'>
                        <i className="ki-outline ki-message-text-2" />
                        Alert
                    </button>
                )
            },
            header: () => <span className='hidden md:inline-block'>Actions</span>,
            enableSorting: false
        }
    ]

    const renderDisclosureContent = ({row} : {row: Row<SampleTableData>}) => {
        return (
            <pre className='text-xs'>
                {JSON.stringify(row.original, null, 2)}
            </pre>
        )
    }
    
    return (
        <div className='card w-full mt-4'>
            <div className='card-header min-h-16'>
                <h1 className='text-xl'>Sample Table</h1>
                {selectedData.length
                    ? <button className='btn btn-md btn-outline btn-info flex gap-2 items-center' onClick={() => alert(JSON.stringify(selectedData))}>
                        <i className="ki-outline ki-check-squared"></i>
                        See Selections
                    </button>
                    : null
                }
            </div>
            <div className='card-body'>
                <CommonTable 
                    columns={columns} 
                    data={tableData}
                    // optional props for including checkbox selection
                    hasCheckbox={true}
                    rowSelection={selectedRows} 
                    setRowSelection={setSelectedRows}
                    // optional props for including disclosure content
                    hasDisclosure={true}
                    disclosureContent={renderDisclosureContent}
                />
            </div>
        </div>
    )
}

export default SampleTable;