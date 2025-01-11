'use client'
import "./style/block_style.css";
import "./style/globals.css";
import "./style/style.css";

import Login from "./component/block/Login";
import NavBar from "./component/block/NavBar";

import { useState } from "react";
import { AxiosProvider } from "./component/context/AxiosContext";
import { SocketProvider } from "./component/context/SocketContext";
import { UserProvider } from "./component/context/UserContext";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <html>
      <head>
        <title>Chats</title>
      </head>
      <body>
        <AxiosProvider>
          <UserProvider>
            <SocketProvider>
              {
                isLogin ? (
                <div id="MainWrap">
                  <NavBar></NavBar>
                  <div id="contentWrap">
                    {children}
                  </div>
                </div>
                ) : (
                  <Login setIsLogin={setIsLogin}></Login>
                )
              }
            </SocketProvider>
          </UserProvider>
        </AxiosProvider>
        </body>
    </html>
  );
}