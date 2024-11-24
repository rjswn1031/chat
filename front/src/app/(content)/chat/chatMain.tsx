"use client"
import ContentMain from "@/app/component/block/ContentMain";
import { convDateFormat } from "@/app/component/config/common";
import { ChatRoomInfo } from "@/app/component/config/type";
import { useAxios } from "@/app/component/context/AxiosContext";
import { useUser } from "@/app/component/context/UserContext";
import { useEffect, useState } from "react";

const ChatMain = ({setRoomId}: {setRoomId:Function}):JSX.Element => {
    const user = useUser();
    const axios = useAxios();

    const getChatList = () => {
        return null;
    }

    const ContentItem = ({info}: {info: ChatRoomInfo}) => { //console.log(info)
        return (
            <li className="ctntItem" onClick={()=>{setRoomId(info.room_id)}}>
                <div className="ctntItemLeft">
                    <div className="title">{info.room_name ? info.room_name : info.room_member}</div>
                    <div className="chat">{info.msg_content}</div>
                </div>
                <div className="ctntItemRight">
                    <div className="time">{convDateFormat(info.max_dt, "hm")}</div>
                    <div className="cntWrap">
                        <div className="cnt">{info.no_read_cnt}</div>
                    </div>
                </div>
            </li>
        )
    }

    const ChatList = ():JSX.Element => {
        const [chatList, setChatList] = useState<Array<ChatRoomInfo>>([]);
        useEffect(()=>{
            axios?.post("/getChatRoomList", null, {params: {"mem_id": user?.user.mem_id}}).then(r=>{ //console.log(r)
                setChatList(r.data);
            });
        }, [])

        return (
            <>
                { chatList.map((x:ChatRoomInfo, idx:number)=>{ return <ContentItem key={idx} info={x}></ContentItem> }) }
            </>
        )
    }

    return (
        <ContentMain title="Chats" searchFunc={getChatList}>
            <ul id="ctntItemWrap">
                <ChatList></ChatList>
            </ul>
        </ContentMain>
    )
}

export default ChatMain;