import { FC, useState, useEffect } from 'react'
import { AssetMember, getAssetMembers } from '../lib/actions.ts'

const EditAsset: FC = () => {

    const [assetMembers, setAssetMembers] = useState<AssetMember[]>([])

    useEffect(() => {
        const fetchAssetMembers = async () => {
            const data: AssetMember[] = await getAssetMembers()
            setAssetMembers(data)
        }
        fetchAssetMembers()
    },[])

    // Function to group rooms by Home Facility
    const groupAssetsByFacility = (assetMembers: AssetMember[]) => {
        return assetMembers.reduce((acc, room) => {
            if (!acc[room.HOMEFACILITY]) {
                acc[room.HOMEFACILITY] = []
            }
            acc[room.HOMEFACILITY].push(room)
            return acc
        }, {} as Record<string, AssetMember[]>)
    };

    // Group rooms by facility
    const groupedAssetMembers = groupAssetsByFacility(assetMembers)

    return (
        <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] 2xl:max-w-[85%] ml-auto mr-auto" 
            data-stepper="false" id="addEvent"
        >
            {/* {warning && <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />} */}
            <div className="card">
                <div className="card-header flex justify-between items-center gap-4 py-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Edit Assets</h2> 
                </div>
                <div className="card-body py-16">
                    <input type='hidden' name='eventid' id='eventid' />
                    <div className="flex flex-col items-center justify-center text-3xl font-semibold text-gray-900 gap-5 xl:gap-10">
                        <div className="w-1/2">
                            <div className="flex items-center flex-wrap lg:flex-nowrap justify-between">
                                <label className="text-md">
                                    Rand Whitney Assets
                                </label>
                                <button className="btn btn-primary">{`+ Add Asset`}</button>
                            </div>
                        </div> 
                        {Object.keys(groupedAssetMembers).map(facility => (
                            <table className="table-auto w-1/2">
                                <thead>
                                    <tr className='text-md h-8 bg-gray-500'>
                                        <th colSpan={3}>{facility}</th>
                                    </tr>
                                    <tr className='text-md h-8 bg-blue-500 text-white'>
                                        <th colSpan={3}>
                                            {assetMembers[0].ASSETTYPE}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedAssetMembers[facility].map(room => (
                                        <>
                                        <tr className='h-8'>
                                            <td className='text-md'>{room.ASSETNAME}</td>
                                            <td className='text-md'>{room.ASSETTYPE}</td>
                                            <td className='text-md'>
                                                <button className='btn btn-warning'>Edit</button>
                                            </td>
                                        </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditAsset