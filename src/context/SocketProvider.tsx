import { PropsWithChildren, createContext } from "react";
import { Socket, io } from "socket.io-client";
import { BASE_WSS } from "utils/httpClients";

interface SocketContextValue {
  socket?: Socket;
}

export const SocketContext = createContext<SocketContextValue>({});

const SocketProvider = ({ children }: PropsWithChildren) => {
  const socket = io(BASE_WSS, { transports: ["websocket", "polling"] });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
