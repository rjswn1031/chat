'use client'
import "./chatStyle.css";

import { useState } from "react";
import ChatDetail from "./chatDetail";
import ChatMain from "./chatMain";

export default function Home() {
    const [roomId, setRoomId] = useState(1);

    return (
        <div id="chatWrap">
            <ChatMain setRoomId={setRoomId}></ChatMain>
            <ChatDetail roomId={roomId}></ChatDetail>
        </div>
    );
}