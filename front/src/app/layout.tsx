import "./style/block_style.css";
import "./style/globals.css";
import "./style/style.css";

import NavBar from "./component/block/NavBar";
import { AxiosProvider } from "./component/context/AxiosContext";
import { SocketProvider } from "./component/context/SocketContext";
import { UserProvider } from "./component/context/UserContext";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html>
      <head>
        <title>Chats</title>
      </head>
      <body>
        <AxiosProvider>
          <UserProvider>
            <SocketProvider>
              <div id="MainWrap">
                <NavBar></NavBar>
                <div id="contentWrap">
                  {children}
                </div>
              </div>
            </SocketProvider>
          </UserProvider>
        </AxiosProvider>
        </body>
    </html>
  );
}