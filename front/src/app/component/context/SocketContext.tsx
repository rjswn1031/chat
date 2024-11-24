"use client"

import { Client } from "@stomp/stompjs";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";

const SocketContext = createContext<{client:Promise<Client>, send:Function, setCallback:Function}|null>(null);

export const SocketProvider = ({children}:{children: ReactNode}) => {
    const _client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:7010/ws'),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    const [isConnect, setIsConnect] = useState<Boolean>(false);
    const [msgCallback, setMsgCallback] = useState<Array<Function>>([]);
    const [client, setClient] = useState<Client>(_client);

    const connectPromise:Promise<Client> = new Promise((res,rej)=>{
        client.onConnect = (frame:any) => {
            console.log('Connected: ' + frame);
            setIsConnect(true);
        
            res(client);
            /*
            // /topic/chat 구독
            client.subscribe('/topic/chat/1', function (message) {
                const messageContent = message.body//JSON.parse(message.body);
                msgCallback.map((f:Function)=>f(message))
                console.log(messageContent);
            });
    
            // /topic/chat 구독
            client.subscribe('/topic/chat/2', function (message) {
                const messageContent = message.body//JSON.parse(message.body);
                msgCallback.map((f:Function)=>f(message))
                console.log(messageContent);
            });
            */
        }
    });
    
    client.onStompError = (error:any) => { 
        console.log('Broker reported error: ' + error.headers['message']);
        console.log('Additional details: ' + error.body);
        setIsConnect(false);
    }

    const sendMessage = (roomId:number, data:any) => {
        const body = JSON.stringify(data);
        if(isConnect) {
            client.publish({ destination: '/app/chat/'+roomId, body: body });
        } else {
            //sendMessage(data);
        }
    }

    useEffect(()=>{
        client.activate();
    }, []);

    return (
    <SocketContext.Provider value={{client: connectPromise, send: sendMessage, setCallback: setMsgCallback}}>
        {children}
    </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context===undefined) {
      throw new Error('useSocket must be used within an SocketProvider');
    }
    return context;
};