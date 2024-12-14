'use client'
import "./chatStyle.css";

import { convDateFormat } from "@/app/component/config/common";
import { ChatRoomInfo, MsgInfo, MsgListInfo } from "@/app/component/config/type";
import { useAxios } from "@/app/component/context/AxiosContext";
import { useSocket } from "@/app/component/context/SocketContext";
import { useUser } from "@/app/component/context/UserContext";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import ChatDetail from "./chatDetail";
import ChatMain from "./chatMain";

export default function Home() {
    const user = useUser();
    const axios = useAxios();
    const socket = useSocket();
    
    const roomIdRef = useRef(1);
    const [roomId, setRoomId] = useState(1);
    const [roomList, setRoomList] = useState<Array<ChatRoomInfo>>([]);
    const [timeList, setTimeList] = useState<Array<string>>([]);
    const [msgList, setMsgList] = useState<Array<MsgListInfo>>([]);

    const addTime = (time:string) => {
        if(!timeList.includes(time)) {
            setTimeList((prev)=>Array.from(new Set([...prev, time])));
        };
    };

    const addMsg = (msgInfo:MsgInfo) => {
        const date = convDateFormat(msgInfo.msg_create_dt, "YMD");
        const info = {
            date: date,
            time: convDateFormat(msgInfo.msg_create_dt, "hm"),
            name: msgInfo.mem_name,
            msg: msgInfo.msg_content,
            left: msgInfo.msg_send_id === user?.user.mem_id ? false : true
        };
        setMsgList((prev)=>[...prev, info]);
    };
    
    useEffect(()=>{
        axios?.post("/getChatRoomList", null, {params: {"mem_id": user?.user.mem_id}}).then(r=>{ //console.log(r)
            setRoomList(r.data); //방 정보 세팅

            r.data.map((roomInfo:ChatRoomInfo)=>{
                socket?.client.then(client=>{
                    client.subscribe(`/topic/chat/${roomInfo.room_id}`, function (message) {
                        const messageContent = message.body//JSON.parse(message.body);
                        const msgInfo = JSON.parse(messageContent);

                        if(msgInfo.room_id == roomIdRef.current) {
                            const date = convDateFormat(msgInfo.msg_create_dt, "YMD");
                            addTime(date);
                            addMsg(msgInfo);
                        };
                    });
                });
            });
        });
    }, []);

    useEffect(()=>{
        axios?.post("/getMsgList", null, {params: {room_id: roomId}}).then((r:AxiosResponse)=>{ //console.log(r)
            let timeArr = [];
            let msgArr = [];

            for(let msgInfo of r.data) {
                const date = convDateFormat(msgInfo.msg_create_dt, "YMD");
                const info = {
                    date: date,
                    time: convDateFormat(msgInfo.msg_create_dt, "hm"),
                    name: msgInfo.mem_name,
                    msg: msgInfo.msg_content,
                    left: msgInfo.msg_send_id === user?.user.mem_id ? false : true
                }

                timeArr.push(date);
                msgArr.push(info);
            }
            
            setTimeList(Array.from(new Set(timeArr)));
            setMsgList(msgArr);
        });
    }, [roomId]);

    useEffect(()=>{
        roomIdRef.current = roomId;
    }, [roomId]);

    return (
        <div id="chatWrap">
            <ChatMain roomList={roomList} setRoomId={setRoomId}></ChatMain>
            <ChatDetail roomId={roomId} msgList={msgList} timeList={timeList}></ChatDetail>
        </div>
    );
}