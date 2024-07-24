import React, { useState, useEffect, createElement, SetStateAction, Dispatch, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/pro-duotone-svg-icons'
import { faSort as faUnsorted } from '@fortawesome/pro-solid-svg-icons'
import Filter from './Filter'
import {
    flexRender,
    useReactTable,
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getExpandedRowModel,
    ColumnDef,
    ColumnFiltersState,
} from '@tanstack/react-table'
import IndeterminateCheckbox from './IndeterminateCheckbox'


type CommonTableProps = {
    columns: any,
    data: any,
    hasCheckbox?: boolean,
    hasDisclosure?: boolean,
    disclosureContent?: ({ row }: { row: any }) => JSX.Element,
    rowSelection?: any,
    setRowSelection?: Dispatch<SetStateAction<any>>,
}

const CommonTable = ({ columns: propColumns, data: propData, hasCheckbox = false, rowSelection = [], setRowSelection, hasDisclosure = false, disclosureContent }: CommonTableProps) => {
    const [data, setData] = useState(() => [...propData])
    const [columns, setColumns] = useState(() => [...propColumns])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getRowCanExpand: () => hasDisclosure,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            columnFilters,
            rowSelection,
            sorting,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
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
        const disclosureColumn: ColumnDef<any>[] = [
            {
                id: 'select',
                header: () => null,
                cell: ({ row }: { row: any }) => {
                    return row.getCanExpand() ? (
                        <button
                            {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: { cursor: 'pointer' },
                            }}
                        >
                            {row.getIsExpanded() ? <i className="ki-filled ki-down"></i> : <i className="ki-filled ki-right"></i>}
                        </button>
                    ) : (
                        '🔵'
                    )
                },
            },
        ]
        setData(propData)
        setColumns(propColumns)
        hasCheckbox && setColumns([...checkBoxColumn, ...propColumns])
        hasDisclosure && setColumns([...disclosureColumn, ...propColumns])
        hasCheckbox && hasDisclosure && setColumns([...checkBoxColumn, ...disclosureColumn, ...propColumns])
    }, [propData, propColumns, hasCheckbox])

    return (
        <div>
            <table className='table table-auto align-middle text-gray-700 font-medium text-sm'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup, idx) => {
                        console.log({ headerGroupID: headerGroup.id })
                        return (
                            <tr key={`${headerGroup.id}-${idx}`}>
                                {headerGroup.headers.map((header, headerIdx) => (
                                    <th key={`${header.id}-${headerIdx}`}>

                                        {header.isPlaceholder
                                            ? null
                                            :
                                            <>
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
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} />
                                                    </div>
                                                ) : null}
                                            </>
                                        }

                                    </th>
                                ))}
                            </tr>
                        )
                    })}
                </thead>
                <tbody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row, rowIdx) => (
                            <React.Fragment key={`${row.id}-${rowIdx}`}>
                                <tr>
                                    {row.getVisibleCells().map((cell, cellIdx) => {
                                        return (
                                            <td key={`${cell.id}-${cellIdx}`}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                                {row.getIsExpanded() && (
                                    <tr>
                                        {/* 2nd row is a custom 1 cell row */}
                                        <td colSpan={row.getVisibleCells().length}>
                                            {disclosureContent!({ row })}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}

                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup, footIdx) => (
                        <tr key={`${footerGroup.id}-${footIdx}`}>
                            {footerGroup.headers.map((header, headerIdx) => (
                                <th key={`${header.id}-${headerIdx}`}>
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