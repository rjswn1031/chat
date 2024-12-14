"use client"

import ChatMainArea from "@/app/component/chatDetail/chatMainArea";
import { convDateFormat } from "@/app/component/config/common";
import { MsgInfo, MsgListInfo } from "@/app/component/config/type";
import { useAxios } from "@/app/component/context/AxiosContext";
import { useSocket } from "@/app/component/context/SocketContext";
import { useUser } from "@/app/component/context/UserContext";
import { useState } from "react";
import { BsCursor, BsEmojiSmile, BsFillPersonFill, BsPaperclip } from "react-icons/bs";

const ChatDetail = ({roomId, msgList, timeList}: {roomId:number, msgList:Array<MsgListInfo>, timeList:Array<string>}):JSX.Element => {
    const axios = useAxios();
    const user = useUser();
    const socket = useSocket();

    const [msgValue, setMsgValue] = useState("");
    const sendMsg = (msg:string) => {
        
        const msgInfo:MsgInfo = {
            mem_name: user?.user.mem_name ? user?.user.mem_name : "",
            msg_content: msgValue,
            msg_create_dt: convDateFormat(new Date(), "YMD"),
            msg_no: 0,
            msg_send_id: user?.user.mem_id ? user?.user.mem_id : "",
            msg_state: false,
            room_id: roomId
        };

        axios?.post("/sendMsg", null, {params: {room_id:roomId, mem_id:user?.user.mem_id, msg_content: msg}});
        socket?.send(roomId, {...msgInfo});

        setMsgValue("");
    };

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
            <ChatMainArea roomId={roomId} msgList={msgList} timeList={timeList}></ChatMainArea>
            <div id="bottomArea">
                <div id="bottomChatWrap">
                    <button className="msgBtn"><BsEmojiSmile/></button>
                    <input type="text" placeholder={"Enter Message"} value={msgValue} onKeyDown={(e)=>{if(e.key=="Enter") {sendMsg(msgValue);}}} onChange={(e)=>{setMsgValue(e.target.value)}}/>
                    <button className="msgBtn"><BsPaperclip/></button>
                    <button className="msgBtn" onClick={(e)=>{sendMsg(msgValue)}}><BsCursor/></button>
                </div>
            </div>
        </div>
    )
}

export default ChatDetail;