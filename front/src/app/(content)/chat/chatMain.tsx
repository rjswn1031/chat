"use client"
import ContentMain from "@/app/component/block/ContentMain";
import { convDateFormat } from "@/app/component/config/common";
import { ChatRoomInfo } from "@/app/component/config/type";

const ChatMain = ({roomList, setRoomId}: {roomList: Array<ChatRoomInfo>,setRoomId:Function}):JSX.Element => {
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

    return (
        <ContentMain title="Chats" searchFunc={getChatList}>
            <ul id="ctntItemWrap">
                { roomList.map((x:ChatRoomInfo, idx:number)=>{ return <ContentItem key={idx} info={x}></ContentItem> }) }
            </ul>
        </ContentMain>
    )
}

export default ChatMain;