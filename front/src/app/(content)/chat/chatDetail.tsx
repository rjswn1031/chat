"use client"

import ChatMainArea from "@/app/component/chatDetail/chatMainArea";
import { useAxios } from "@/app/component/context/AxiosContext";
import { useSocket } from "@/app/component/context/SocketContext";
import { useUser } from "@/app/component/context/UserContext";
import { useState } from "react";
import { BsCursor, BsEmojiSmile, BsFillPersonFill, BsPaperclip } from "react-icons/bs";

const ChatDetail = ({roomId}: {roomId:number}):JSX.Element => {
    const axios = useAxios();
    const user = useUser();
    const socket = useSocket();

    const [msgValue, setMsgValue] = useState("");
    const sendMsg = (msg:string) => {
        setMsgValue("");
        
        //axios?.post("/sendMsg", null, {params: {room_id:roomId, mem_id:user?.user.mem_id, msg_content: msg}});
        socket?.send(1, {msg: 'Hello world1'});
    }
    const sendMsg2 = (msg:string) => {
        setMsgValue("");
        
        //axios?.post("/sendMsg", null, {params: {room_id:roomId, mem_id:user?.user.mem_id, msg_content: msg}});
        socket?.send(2, {msg: 'Hello world2'});
    }

    /*
    useEffect(()=>{
        console.log(roomId)
        socket?.client.then((client)=>{
            client.subscribe(`/topic/chat/${roomId}`, function (message) {
                const messageContent = message.body//JSON.parse(message.body);
                //msgCallback.map((f:Function)=>f(message))
                console.log(messageContent);
            });
        })
    }, [])*/

    return (
        <div id="chatDetail">
            <div id="topArea">
                <div id="charImg">
                    <div>
                        <BsFillPersonFill />
                    </div>
                </div>
                <div id="name">박병준</div>
            </div>
            <ChatMainArea roomId={roomId}></ChatMainArea>
            <div id="bottomArea">
                <div id="bottomChatWrap">
                    <button className="msgBtn"><BsEmojiSmile/></button>
                    <input type="text" placeholder={"Enter Message"} onKeyDown={(e)=>{if(e.key=="Enter") {sendMsg2(msgValue);}}} onChange={(e)=>{setMsgValue(e.target.value)}}/>
                    <button className="msgBtn"><BsPaperclip/></button>
                    <button className="msgBtn" onClick={(e)=>{sendMsg(msgValue)}}><BsCursor/></button>
                </div>
            </div>
        </div>
    )
}

export default ChatDetail;