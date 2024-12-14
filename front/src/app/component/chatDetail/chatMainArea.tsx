'use client'
import { useEffect, useRef } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import { convDateFormat } from "../config/common";
import { MsgListInfo } from "../config/type";
import { useAxios } from "../context/AxiosContext";
import { useUser } from "../context/UserContext";

import "./chatMainArea.css";

const ChatMainArea = ({roomId, msgList, timeList}: {roomId:number, msgList:Array<MsgListInfo>, timeList:Array<string>}):JSX.Element => {
    const user = useUser();
    const axios = useAxios();

    const chatMainRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        //chatMainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        if(chatMainRef.current) chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
        //chatMainRef.current?.scrollIntoView({block: "end"})
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
        <div id="mainArea" ref={chatMainRef}>
            {timeList.map((t:string, i:number)=><TimeBlock key={i} date={t}></TimeBlock>)}
        </div>
    )
}

export default ChatMainArea;