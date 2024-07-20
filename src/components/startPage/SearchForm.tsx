import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/pro-regular-svg-icons';

const SearchForm = () => {
    const [showForm, setShowForm] = useState<boolean>(true);
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
                        [form goes here]
                    </div>
                    <div className="card-footer">
                        <div className="flex w-full justify-end gap-2">
                            <button className="btn btn-secondary text-lg font-light px-4 py-2">
                                Clear
                            </button>
                            <button className="btn btn-primary text-lg font-light px-4 py-2">
                                <i className="ki-filled ki-magnifier"></i>
                                Search
                            </button>
                            <button className="btn btn-info text-lg text-white font-light px-4 py-2">
                                <i className="ki-filled ki-paper-plane" />
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