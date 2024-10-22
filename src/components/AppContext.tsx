import { createContext } from "react";
import { User } from "../lib/types";

const AppContext = createContext({} as {
    apiData: {
        baseURL: string,
        authToken: string
    },
    userData: User
})
export default AppContext