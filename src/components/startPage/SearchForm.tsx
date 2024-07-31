import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/pro-regular-svg-icons';

const SearchForm = ({setSearchValues, handleEmailCSV}:{setSearchValues:(val:any) => void, handleEmailCSV:(val:any)=>void}) => {
    const [showForm, setShowForm] = useState<boolean>(true);
    const [formValues, setFormValues] = useState({})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
        setFormValues({
            ...formValues,
            [key]: event.target.value
        })
    }

    return (
        <div className="card w-full mt-5">
            <div className="card-header">
                <h1 className="text-xl flex items-baseline gap-3">
                    <div className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faGlobe} className='text-sky-500' />
                        Page Name
                    </div>
                    <i className="ki-filled ki-printer text-slate-400"></i>
                </h1>
                <label className="switch">
                    <input name="check" type="checkbox" onChange={() => setShowForm(!showForm)} checked={showForm} value="1" />
                    Hide Search
                </label>
            </div>
            {showForm &&
                <>
                    <div className="card-body">
                        <div className='grid grid-cols-4 gap-2 mx-4'>
                            <div>
                                <label>FirstName</label>
                                <input onChange={(event) => handleChange(event, 'firstName')} type="text" className="input" placeholder="First Name" />
                            </div>
                            <div>
                                <label>LastName</label>
                                <input onChange={(event) => handleChange(event, 'lastName')} type="text" className="input" placeholder="Last Name" />
                            </div>
                            <div>
                                <label>status</label>
                                <select onChange={(event) => handleChange(event, 'status')} className="input">
                                    <option value="">Select Status</option>
                                    <option value="online">online</option>
                                    <option value="away">away</option>
                                    <option value="offline">offline</option>
                                    <option value="vacation">vacation</option>
                                </select>
                            </div>
                            <div>
                                <label>Age</label>
                                <input type="number" onChange={(event) => handleChange(event, 'age')} className="input" placeholder="Age" />
                            </div>
                            <div>
                                <label>Visits</label>
                                <input type="number" onChange={(event) => handleChange(event, 'visits')} className="input" placeholder="Age" />
                            </div>
                            <div>
                                <label>Progress</label>
                                <input type="number" onChange={(event) => handleChange(event, 'progress')} className="input" placeholder="Age" />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="flex w-full justify-end gap-2">
                            <button className="btn btn-secondary text-lg font-light px-4 py-2" onClick={() => setFormValues({})}>
                                Clear
                            </button>
                            <button className="btn btn-primary text-lg font-light px-4 py-2" onClick={() => setSearchValues(formValues)}>
                                <i className="ki-filled ki-magnifier"></i>
                                Search
                            </button>
                            <button className="btn btn-info text-lg text-white font-light px-4 py-2" onClick={() => handleEmailCSV(formValues)}>
                                <i className="ki-filled ki-paper-plane"/>
                                CSV
                            </button>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}
export default SearchForm;