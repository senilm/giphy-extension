'use client'
import { createContext,useContext, useState, useEffect} from "react";
import { auth } from "./firebase";
import { signInWithCustomToken } from "firebase/auth";
export const userContext = createContext(null)

const UserProvider = ({children}) =>{
    const [isAuth, setIsAuth] = useState(false)

    return(
        <userContext.Provider value={{isAuth,setIsAuth}}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider

export const useUser = () => useContext(userContext)