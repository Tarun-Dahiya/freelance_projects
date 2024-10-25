import axios from 'axios';
import { sampleAppList, sampleUser } from './dummyData'; // used for storing development defaults (for rendering components)
import { defaultUser, sampleTableData } from './defaultData'; // used for storing production defaults


export type SampleTableData = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

export const getSampleTableData = async () : Promise<SampleTableData[]> => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(500);
    return sampleTableData;
}


export type User = {
    USERID: number;
    HOSTPLANT: string;
    USERNAME: string;
    USERLOCALE: string;
    CUSTOMERNAME: string;
    USERFULLNAME: string;
    USERTITLE: string;
    USEREMAIL: string;
    USERPHONE_1: string;
    USERPHONE_MOBILE: string;
    INTERNALROLES: string;
    DEPARTMENT: string;
    COMPANY_ID: number;
    HOOK_URL: string;
    DATECREATED: string;
    AVATAR: string;
}
export const getUser = async (): Promise<User> => {
    if (process.env.NODE_ENV === 'development') {
        return sampleUser;
    }
    try {
        const response = await axios.post(`/webservices/metronic9/api/common.cfc?method=getUser`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        return response.data[0];
    } catch (err) {
        console.error(err)
    }
    return defaultUser;
}

export type AppList = {
    APPID: number;
    APPLICATIONIMAGE: string;
    APPLICATIONURL: string;
    APPLICATIONNAME: string;
}

export const getWebApps = async (): Promise<AppList[]> => {
    try {
        const response = await axios.post(`/webservices/metronic9/api/common.cfc?method=getWebApps`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        if (response.data.SUCCESS) {
            return response.data.PAYLOAD;
        }
    } catch (error) {
        console.error(error);
    }
    return (process.env.NODE_ENV === 'development') ? sampleAppList : []    
}