"use client"

import { createContext, MutableRefObject, ReactNode, useContext, useRef } from "react";
import { MemberInfo } from "../config/type";

const UserContext = createContext<{user:MutableRefObject<MemberInfo>, setUser:Function}|null>(null);

export const UserProvider = ({children}:{children: ReactNode}) => {
    //const memInfo = { mem_id: "leekj", mem_name: "이건주", mem_tel: "010-1111-1111", mem_email: "leekj@chat.com" };
    //const [user, setUser] = useState({...memInfo});
    //const [user, setUser] = useState({ mem_id: "", mem_name: "", mem_tel: "", mem_email: "" });
    const user = useRef({ mem_id: "leekj", mem_name: "", mem_tel: "", mem_email: "" });
    const setUser = (_user:MemberInfo) => {
        user.current = _user;
    }

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