'use client'
import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { convDateFormat } from "../config/common";
import { MsgListInfo } from "../config/type";
import { useAxios } from "../context/AxiosContext";
import { useUser } from "../context/UserContext";

import "./chatMainArea.css";

const ChatMainArea = ({roomId}:{roomId: number}):JSX.Element => {
    const user = useUser();
    const axios = useAxios();
    const [msgList, setMsgList] = useState<Array<MsgListInfo>>([]);
    const [timeList, setTimeList] = useState<Array<string>>([]);

    useEffect(()=>{
        axios?.post("/getMsgList", null, {params: {room_id: roomId}}).then((r:AxiosResponse)=>{ console.log(r)
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

    const TimeBlock = ({date}: {date:string}):JSX.Element => {
        const dayString = ["일","월","화","수","목","금","토"];
        const parseDate = convDateFormat(date, "YMD.");
        const day = new Date(date).getDay();

        const msgTimeList = msgList.filter((m:MsgListInfo)=>convDateFormat(m.date,"YMD") === date)
        return (
            <div className="timeBlock">
                <div className="timeArea">{parseDate} ({dayString[day]})</div>
                {msgTimeList.map((msg:{time:string, name:string, msg:string, left:boolean}, idx:number)=>(
                    <MessageBlock key={idx} left={msg.left} msg={msg.msg} name={msg.name} time={msg.time}></MessageBlock>
                ))}
            </div>
        )
    }

    const MessageBlock = ({ left, name, time, msg }: {left:Boolean, name:string, time:string, msg:string}):JSX.Element => {
        return (
            <div className={`chatBlock ${left ? "left":"right"}`}>
                <div className="userBlock">
                    {left ? (
                        <div className="userImg">
                            <BsFillPersonFill/>
                        </div>
                    ) : <></>}
                    <div className="userInfo">
                        <div>{name}</div>
                        <div className="time">{time}</div>
                    </div>{left ? <></> : (
                        <div className="userImg">
                            <BsFillPersonFill/>
                        </div>
                    )}
                </div>
                <div className="message">{msg}</div>
            </div>
        )
    }

    return (
        <div id="mainArea">
            {timeList.map((t:string, i:number)=><TimeBlock key={i} date={t}></TimeBlock>)}
        </div>
    )
}

export default ChatMainArea;