import { useEffect, useState } from 'react'
import { Column } from '@tanstack/react-table'


const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
    const [value, setValue] = useState(initialValue)
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
    }, [value])
  
    return (
      <input {...props} value={value} className='input input-sm' onChange={e => setValue(e.target.value)} />
    )
  }

const Filter = ({ column }: { column: Column<any, unknown> }) => {
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = (column.columnDef.meta as { filterVariant?: string }) ?? {}
  
    return filterVariant === 'range' ? (
      <div>
        <div className="flex space-x-2">
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`Min`}
            className="w-24 border shadow rounded"
          />
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
    ) : (
      <DebouncedInput
        className="w-36 border shadow rounded"
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search...`}
        type="text"
        value={(columnFilterValue ?? '') as string}
      />
    )
  }

  export default Filter