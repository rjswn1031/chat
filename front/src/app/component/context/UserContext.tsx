"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { MemberInfo } from "../config/type";

const UserContext = createContext<{user:MemberInfo, setUser:Function}|null>(null);

export const UserProvider = ({children}:{children: ReactNode}) => {
    const [user, setUser] = useState({mem_id: "", mem_name: "", mem_tel: "", mem_email: ""});
    useEffect(()=>{
        setUser({ mem_id: "leekj", mem_name: "이건주", mem_tel: "010-1111-1111", mem_email: "leekj@chat.com" });
    }, [])

    return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context===undefined) {
      throw new Error('useUser must be used within an user');
    }
    return context;
};