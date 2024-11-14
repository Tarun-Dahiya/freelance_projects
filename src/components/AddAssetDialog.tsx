import { FC, useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./floating_ui/Dialog"
import Select from 'react-select'
import axios from 'axios'

interface AddAssetDialogProps {
    room: {
      ASSETNAME: string;
      ASSETTYPE: string;
      HOMEFACILITY: string;
      STATUS: string;
      ASSETID: number;
      [key: string]: any; 
    } | null;
}

interface OptionType {
    value: string | undefined;
    label: string | undefined;
}

const AddAssetDialog: FC<AddAssetDialogProps> = ({ room }) => {
    const [name, setName] = useState<string>()
    const [type, setType] = useState<string>()
    const [facility, setFacility] = useState<string>()
    const [status, setStatus] = useState<string>()
    const [assetid, setAssetId] = useState<string>()
    const [bgColor, setBgColor] = useState<string>()
    const [textColor, setTextColor] = useState<string>()

    useEffect(() => {
        if (room) {
            setName(room.ASSETNAME)
            setType(room.ASSETTYPE)
            setFacility(room.HOMEFACILITY)
            setStatus(room.STATUS)
            setAssetId(room.ASSETID.toString())
            setBgColor('dark:bg-light-active')
            setTextColor('dark:text-slate-300')
        } else {
            setName('New Asset')
        }
    }, [room])

    const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const response = await axios.post(`/webservices/assetScheduling2/api/calendar.cfc?method=updateVal`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            },
            data: {
                assetid: assetid,
                tableName: 'Asset_Members',
                col: 'ASSETNAME',
                valType: 'text',
                value: e.target.value
            }
        })

        const data = response.data
        if(data.includes('ASSETNAME')){
            
        }
    }

    const handleTypeChange = async (option: OptionType | null) => {
        setType(option?.value)
        const response = await axios.post(`/webservices/assetScheduling2/api/calendar.cfc?method=updateVal`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            },
            data: {
                assetid: assetid,
                tableName: 'Asset_Members',
                col: 'ASSETTYPE',
                valType: 'text',
                value: option?.value
            }
        })

        const data = response.data
        if(data.includes('ASSETTYPE')){
            alert('Asset Type already exists')
        }
    }

    const handleFacilityChange = async (option: OptionType | null) => {
        setFacility(option?.value)
        const response = await axios.post(`/webservices/assetScheduling2/api/calendar.cfc?method=updateVal`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            },
            data: {
                assetid: assetid,
                tableName: 'Asset_Members',
                col: 'HOMEFACILITY',
                valType: 'text',
                value: option?.value
            }
        })

        const data = response.data
        if(data.includes('HOMEFACILITY')){
            console.log('Facility already exists')
            setBgColor('dark:bg-green-500')
            setTextColor('dark:text-white')
        }
    }

    const handleStatusChange = async (option: OptionType | null) => {
        setStatus(option?.value)
        const response = await axios.post(`/webservices/assetScheduling2/api/calendar.cfc?method=updateVal`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            },
            data: {
                assetid: assetid,
                tableName: 'Asset_Members',
                col: 'STATUS',
                valType: 'text',
                value: status
            }
        })

        const data = response.data
        if(data.includes('STATUS')){
            alert('Status already exists')
        }
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
                                type="text" value={name} 
                                onBlur={(e) => handleNameChange(e)}
                                onChange={(e) => setName(e.target.value)} />
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
                                        { value: 'Conference Room', label: 'Conference Room' },
                                        {value: 'Conference Dial In Number', label: 'Conference Dial In Number'}
                                    ]}
                                    value={{ value: type, label: type }}
                                    placeholder="Select asset type..."
                                    onChange={handleTypeChange}
                                />
                            </div>
                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
                                <label className="form-label flex items-center gap-1 max-w-32">
                                    Home Facility
                                </label>
                                <Select 
                                    classNames={{ 
                                        control: () => `dark:border-black ${bgColor} ${textColor}`,
                                        menu: () => 'dark:bg-light-active dark:border-black',
                                        option: () => 'dark:text-slate-300 dark:bg-light-active dark:hover:bg-gray-400',
                                        input: () => 'dark:text-slate-300',
                                        placeholder: () => 'dark:text-slate-300',
                                        singleValue: () => `${textColor}`,
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
                                    onChange={handleFacilityChange}
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
                                        { value: 'Free', label: 'Free' },
                                        { value: 'Available', label: 'Available' },
                                        { value: 'Retired', label: 'Retired' }
                                    ]}
                                    value={{ value: status, label: status }}
                                    placeholder="Select status..."
                                    onChange={handleStatusChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <DialogClose>
                                <button className="btn btn-secondary">Cancel</button>
                            </DialogClose>
                            {/* <DialogClose>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => addAssets()}
                                >
                                    Save
                                </button>
                            </DialogClose> */}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddAssetDialog