"use client"

import { ReactNode } from "react";
import { BiX } from "react-icons/bi";

const Modal = ({title, children}: {title: string, children: ReactNode}):JSX.Element => {

    return (
       <div className="modalWrap">
            <div className="mTop">
                <div className="mTitle">{title}</div>
                <div className="mTBtn"><BiX></BiX></div>
            </div>
            <div className="mContent">
                {children}
            </div>
            <div className="mBottom"></div>
       </div>
    );
}

export default Modal;