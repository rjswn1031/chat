"use client"

import { AxiosResponse } from "axios";
import { useState } from "react";
import { MemberInfo } from "../config/type";
import { useAxios } from "../context/AxiosContext";
import { useUser } from "../context/UserContext";

const Login = ({setIsLogin}: {setIsLogin: Function}):JSX.Element => {
    const axios = useAxios();
    const user = useUser();

    const [id, setId] = useState("");
    const [pass, setPass] = useState("");

    const setLogin = () => {
        axios?.post("/getLogin", null, {params: {mem_id: id, mem_pass: pass}}).then((r:AxiosResponse)=>{
            if(r.data.length > 0) {
                const userInfo:MemberInfo = r.data[0];
                user?.setUser({ mem_id: userInfo.mem_id, mem_name: userInfo.mem_name, mem_tel: userInfo.mem_tel, mem_email: userInfo.mem_email });
                setIsLogin(true);
            } else {
                alert("ID 및 비밀번호가 올바르지 않습니다.")
            }
        });

        
        //alert(id+", "+pass);
        //setUser();
    }

    return (
       <div id="loginWrap">
            <div>
                <div>Chat</div>
                <div>
                    <label>아이디</label>
                    <input onChange={(e)=>{setId(e.target.value)}}/>
                </div>
                <div>
                    <label>비밀번호</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}}/>
                </div>
                <div onClick={()=>{setLogin();}}>로그인</div>
            </div>
       </div>
    );
}

export default Login;