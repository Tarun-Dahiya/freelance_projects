import { useEffect, useState } from 'react';
import { getUser, User } from '../../../lib/actions';
import DrawerFrame from '../DrawerFrame';
import AvatarUpload from '../../inputs/AvatarUpload';

const UserSettings = ({ drawerId, setAvatar }: { drawerId: string, setAvatar: (img:string) => void }) => {
    const sampleUser: User = {
        USERID: 0,
        HOSTPLANT: '',
        USERNAME: '',
        USERLOCALE: '',
        CUSTOMERNAME: '',
        USERFULLNAME: '',
        USERTITLE: '',
        USEREMAIL: '',
        USERPHONE_1: '',
        USERPHONE_MOBILE: '',
        INTERNALROLES: '',
        AVATAR: '',
        DEPARTMENT: '',
        COMPANY_ID: 0,
        HOOK_URL: '',
        DATECREATED: '',
    }
    const [user, setUser] = useState<User>(sampleUser);
    
    const formatPhone = (phone: string) => {
        if (phone.length === 10) {
            return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
        }
        return phone;
    }

    useEffect(() => {
        const updateUser = async () => {
            const fetchedUser = await getUser();
            if (fetchedUser.USERNAME) setUser(fetchedUser);
        };
        updateUser();
    }, []);

    useEffect(() => {
        console.log({user});
    }, [user]);


    return (
        <DrawerFrame title={'User Settings'} drawerId={drawerId} width={'800px'}>
            <div className={`flex items-center justify-center m-4`}>
                {user &&
                    <div className="card min-w-full">
                        <div className="card-header">
                            <h3 className="card-title">
                                Personal Info
                            </h3>
                        </div>
                        <div className="card-table scrollable-x-auto pb-3">
                            <table className="table align-middle text-sm text-gray-500">
                                <tbody>
                                    <tr>
                                        <td className="py-2">
                                            Photo
                                        </td>
                                        <td className="py-2 text-gray-600 min-w-32 text-2sm">
                                            {user.AVATAR}
                                        </td>
                                        <td>
                                            <AvatarUpload userId={user.USERID} src={user.AVATAR} setAvatar={setAvatar}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">
                                            Name
                                        </td>
                                        <td className="py-2 text-gray-700 text-sm">
                                            {user.USERFULLNAME}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">
                                            Company
                                        </td>
                                        <td className="py-3 text-gray-700 text-sm">
                                            {user.CUSTOMERNAME || ''}
                                            {user.HOSTPLANT && (<span className="badge badge-outline badge-xs ms-8 badge-info">{user.HOSTPLANT}</span>)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">
                                            Title
                                        </td>
                                        <td className="py-2 text-gray-700 text-sm">
                                            {user.USERTITLE}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">
                                            Department
                                        </td>
                                        <td className="py-3 text-gray-700 text-sm">
                                            {`${user.DEPARTMENT || ''} ${user.USERLOCALE || ''}`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">
                                            Email
                                        </td>
                                        <td className="py-2 text-gray-700 text-sm">
                                            {user.USERNAME}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-3">
                                            Phone
                                        </td>
                                        <td className="py-3 text-gray-700 text-sm">
                                            {formatPhone(user.USERPHONE_1)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">
                                            Mobile
                                        </td>
                                        <td className="py-2 text-gray-700 text-sm">
                                            {formatPhone(user.USERPHONE_MOBILE)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </DrawerFrame>
    );
}
export default UserSettings;