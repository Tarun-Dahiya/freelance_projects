// Type definitions for the application
export class User {
    USERID: number = 0;
    HOSTPLANT: string = '';
    USERNAME: string = '';
    USERLOCALE: string = '';
    CUSTOMERNAME: string = '';
    USERFULLNAME: string = '';
    USERTITLE: string = '';
    USEREMAIL: string = '';
    USERPHONE_1: string = '';
    USERPHONE_MOBILE: string = '';
    INTERNALROLES: string = '';
    DEPARTMENT: string = '';
    COMPANY_ID: number = 0;
    HOOK_URL: string = '';
    DATECREATED: Date = new Date();
    AVATAR: string = '';
}

export type SampleUserData = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

export type SearchValues = {
    search: string
    page: number
    size: number
    sortField: string
    sortOrder: string
}