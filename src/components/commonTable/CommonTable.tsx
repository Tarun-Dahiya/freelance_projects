import { useState, useEffect, createElement, SetStateAction, Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/pro-duotone-svg-icons'
import { faSort as faUnsorted } from '@fortawesome/pro-solid-svg-icons'
import {
    flexRender,
    useReactTable,
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import IndeterminateCheckbox from './IndeterminateCheckbox'

const CommonTable = ({ columns:propColumns, data:propData, hasCheckbox = false, rowSelection = [], setRowSelection }: { columns: any, data: any, hasCheckbox?:boolean, rowSelection?:any, setRowSelection?: Dispatch<SetStateAction<any>> }) => {
    const [data, setData] = useState(() => [...propData])
    const [columns, setColumns] = useState(() => [...propColumns])
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            rowSelection,
            sorting,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    })

    useEffect(() => {
        const checkBoxColumn = [
            {
                id: 'select',
                header: ({ table }: { table: any }) => (
                  <IndeterminateCheckbox
                    {...{
                      checked: table.getIsAllRowsSelected(),
                      indeterminate: table.getIsSomeRowsSelected(),
                      onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                  />
                ),
                cell: ({ row }: { row: any }) => (
                  <div className="px-1">
                    <IndeterminateCheckbox
                      {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                      }}
                    />
                  </div>
                ),
              },
        ]
        setData(propData)
        hasCheckbox ? setColumns([...checkBoxColumn, ...propColumns]) : setColumns(propColumns)
    }, [propData, propColumns, hasCheckbox])

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
                                        :
                                        <div
                                            {...{
                                                className: header.column.getCanSort() ? 'cursor-pointer' : '',
                                                onClick: header.column.getToggleSortingHandler()
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                { asc: createElement('span', null, <FontAwesomeIcon icon={faSort} className='text-blue-500 text-md ps-2' />), desc: createElement('span', null, <FontAwesomeIcon icon={faSort} flip='vertical' className='text-blue-500 text-md ps-2' />) }
                                                [header.column.getIsSorted() as string] || (
                                                    header.column.getCanSort()
                                                        ? createElement('span', null, <FontAwesomeIcon icon={faUnsorted} className='text-gray-500 text-md ps-2' />)
                                                        : null
                                                )
                                            }
                                        </div>
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
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