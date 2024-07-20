import { useState, useEffect } from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const CommonTable = ({columns, defaultData = false}: {columns:any, defaultData:any}) => {
    const [data, setData] = useState(() => [...defaultData])

    useEffect(() => {
        setData([...defaultData])
    }, [defaultData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <table className='table table-auto align-middle text-gray-700 font-medium text-sm'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header, //names of each header
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    )
}

export default CommonTable;