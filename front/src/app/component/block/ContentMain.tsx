"use client"

import { ReactNode } from "react";

const ContentMain = ({title, searchFunc, children}:{title:string, searchFunc:Function, children:ReactNode}):JSX.Element => {
    return (
        <div id="chatMain">
            <div className="mainTitle">{title}</div>
            <div className="mainSearch">
                <input onChange={()=>{searchFunc()}} placeholder={`Search ${title}`}></input>
            </div>
            <div className="mainContent">
                {children}
            </div>
        </div>
    )
}

export default ContentMain;