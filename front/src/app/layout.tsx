'use client'
import "./style/block_style.css";
import "./style/globals.css";
import "./style/style.css";

import Login from "./component/block/Login";
import NavBar from "./component/block/NavBar";

import { AxiosProvider } from "./component/context/AxiosContext";
import { SocketProvider } from "./component/context/SocketContext";
import { UserProvider, useUser } from "./component/context/UserContext";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const user = useUser();
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
                user?.user.mem_id ? (
                <div id="MainWrap">
                  <NavBar></NavBar>
                  <div id="contentWrap">
                    {children}
                  </div>
                </div>
                ) : (
                  <Login></Login>
                )
              }
            </SocketProvider>
          </UserProvider>
        </AxiosProvider>
        </body>
    </html>
  );
}