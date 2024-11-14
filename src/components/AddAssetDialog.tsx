import { FC, useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./floating_ui/Dialog"
import Select from 'react-select'

interface AddAssetDialogProps {
    room: {
      ASSETNAME: string;
      ASSETTYPE: string;
      HOMEFACILITY: string;
      STATUS: string;
      [key: string]: any; 
    } | null;
  }

const AddAssetDialog: FC<AddAssetDialogProps> = ({ room }) => {
    const [name, setName] = useState<string>()
    const [type, setType] = useState<string>()
    const [facility, setFacility] = useState<string>()
    const [status, setStatus] = useState<string>()

    useEffect(() => {
        if (room) {
            setName(room.ASSETNAME)
            setType(room.ASSETTYPE)
            setFacility(room.HOMEFACILITY)
            setStatus(room.STATUS)
        } 
    }, [room])

    const addAssets = async () => {
        // await editAppDetails()
    }

    return (
        <Dialog>
            <DialogTrigger>
                {room ?
                (<button className="btn btn-md btn-warning flex gap-2 items-center">
                    Edit
                </button>) :
                (<button className="btn btn-md btn-primary flex gap-2 items-center">
                    <i className="ki-outline ki-plus text-sm"></i>
                    Add Asset
                </button>)}
            </DialogTrigger>
            <DialogContent>
                <div className="card w-[700px]">
                    <div className="card-body p-5">
                        <div className="flex flex-col gap-5 w-[80%] ml-auto mr-auto">
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    Asset Name
                                </label>
                                <input className="input" name="name" placeholder="Enter asset name..." 
                                type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    Asset Type
                                </label>
                                <Select
                                    classNames={{ 
                                        control: () => 'dark:bg-light-active dark:border-black',
                                        menu: () => 'dark:bg-light-active dark:border-black',
                                        option: () => 'dark:text-slate-300 dark:bg-light-active dark:hover:bg-gray-400',
                                        input: () => 'dark:text-slate-300',
                                        placeholder: () => 'dark:text-slate-300',
                                        singleValue: () => 'dark:text-slate-300',
                                    }}
                                    className="select p-0 border-0 w-full"
                                    options={[
                                        { value: 'Desk', label: 'Desk' },
                                        { value: 'Projector', label: 'Projector' },
                                        { value: 'Conference Room', label: 'Conference Number' },
                                        {value: 'Conference Dial In Number', label: 'Conference Dial In Number'}
                                    ]}
                                    value={{ value: type, label: type }}
                                    placeholder="Select asset type..."
                                    onChange={(e) => setType(e?.value !== null ? e?.value : '')}
                                />
                            </div>
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    Home Facility
                                </label>
                                <Select 
                                    classNames={{ 
                                        control: () => 'dark:bg-light-active dark:border-black',
                                        menu: () => 'dark:bg-light-active dark:border-black',
                                        option: () => 'dark:text-slate-300 dark:bg-light-active dark:hover:bg-gray-400',
                                        input: () => 'dark:text-slate-300',
                                        placeholder: () => 'dark:text-slate-300',
                                        singleValue: () => 'dark:text-slate-300',
                                    }}
                                    className="select p-0 border-0 w-full"
                                    options={[
                                        { value: 'Agrand St', label: 'Agrand St' },
                                        { value: 'Greenwood St', label: 'Greenwood St' },
                                        { value: 'Northeast', label: 'Northeast' },
                                        { value: 'Red Lion', label: 'Red Lion' },
                                        { value: 'Southeast', label: 'Southeast' },
                                        { value: 'Waterbury', label: 'Waterbury' },
                                        { value: 'Shared', label: 'Shared' },

                                    ]}
                                    value={{ value: facility, label: facility }}
                                    placeholder="Select home facility..."
                                    onChange={(e) => setFacility(e?.value !== null ? e?.value : '')}
                                />
                            </div>
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    Status
                                </label>
                                <Select 
                                    classNames={{ 
                                        control: () => 'dark:bg-light-active dark:border-black',
                                        menu: () => 'dark:bg-light-active dark:border-black',
                                        option: () => 'dark:text-slate-300 dark:bg-light-active dark:hover:bg-gray-400',
                                        input: () => 'dark:text-slate-300',
                                        placeholder: () => 'dark:text-slate-300',
                                        singleValue: () => 'dark:text-slate-300',
                                    }}
                                    className="select p-0 border-0 w-full"
                                    options={[
                                        { value: 'Available', label: 'Available' },
                                        { value: 'Retired', label: 'Retired' }
                                    ]}
                                    value={{ value: status, label: status }}
                                    placeholder="Select status..."
                                    onChange={(e) => setStatus(e?.value !== null ? e?.value : '')}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <DialogClose>
                                <button className="btn btn-secondary">Cancel</button>
                            </DialogClose>
                            <DialogClose>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => addAssets()}
                                >
                                    Save
                                </button>
                            </DialogClose>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddAssetDialog