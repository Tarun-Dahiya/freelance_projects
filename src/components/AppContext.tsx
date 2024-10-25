import { createContext } from "react";
import { User } from "../lib/types";

const AppContext = createContext({} as {
    userData: User
})
export default AppContext