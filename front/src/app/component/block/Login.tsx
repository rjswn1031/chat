"use client"
import { useUser } from "../context/UserContext";

const Login = ():JSX.Element => {
    const user = useUser();
    
    return (
       <div id="loginWrap">
            <div>
                <div>Chat</div>
                <div>
                    <label>아이디</label>
                    <input />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input />
                </div>
                <div>로그인</div>
            </div>
       </div>
    );
}

export default Login;