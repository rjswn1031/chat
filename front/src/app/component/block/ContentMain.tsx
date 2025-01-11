"use client"

import { ReactNode, useEffect, useState } from "react";
import { BsCheck, BsFillPersonFill } from "react-icons/bs";
import { MemberInfo } from "../config/type";
import { useAxios } from "../context/AxiosContext";
import Modal from "./Modal";

const ContentMain = ({title, searchFunc, children}:{title:string, searchFunc:Function, children:ReactNode}):JSX.Element => {
    const axios = useAxios();
    
    const ChatRoomAdd = ():JSX.Element => {
        const [selectMem, setSelectMem] = useState([]);
        const [searchTxt, setSearchTxt] = useState("");
        const [searchUserList, setSearchUserList] = useState([]);

        const MemIcon = ({name}: {name: String}):JSX.Element => {
            return (<div><span>{name}</span><span>x</span></div>);
        };

        const MemItem = ({info}: {info:MemberInfo}) => {
            const [isSelect, setIsSelect] = useState(false);

            return (
                <div className="craMemItem" onClick={()=>{
                    setIsSelect(prev=>{ return !prev; });
                }}>
                    <div className="cramInfo">
                        <div className="cramImg">
                            <BsFillPersonFill />
                        </div>
                        <div className="cramName">{info.mem_name}</div>
                    </div>
                    <span className={"cramCheck" + (isSelect ? " selected" : "")}>
                        <BsCheck></BsCheck>
                    </span>
                </div>
            )
        }

        useEffect(()=>{
            axios?.post("/getMemListByName", null, {params: {"mem_name": searchTxt}}).then(r=>{ //console.log(r)
                setSearchUserList(r.data);
            })
        }, [searchTxt]);

        return (
            <div className="craWrap">
                <div className="craTop">
                    <div className="craMemList">
                        { selectMem.map((x:MemberInfo,i)=><MemIcon key={i} name={x.mem_name}/>) }
                    </div>
                    <div className="craSearch">
                        <input type="text" className="crasInput" onChange={(e)=>{setSearchTxt(e.target.value);}} placeholder="Search Member"></input>
                    </div>
                </div>
                <div className="craSearchList">
                    <div className="craMemList">
                        { searchUserList.map((x:MemberInfo,i)=><MemItem key={i} info={x}/>) }
                    </div>
                </div>
                <div className="craBottom">
                    <button className="craCreateBtn">생성</button>
                </div>
            </div>
        )
    }

    return (
        <div id="chatMain">
            <div className="mainTop">
                <div className="mainTitle">{title}</div>
                <div className="mainAdd">+</div>
            </div>
            <div className="mainSearch">
                <input onChange={()=>{searchFunc()}} placeholder={`Search ${title}`}></input>
            </div>
            <div className="mainContent">
                {children}
            </div>
            <Modal title="채팅 방 생성">
                <ChatRoomAdd></ChatRoomAdd>
            </Modal>
        </div>
    )
}

export default ContentMain;