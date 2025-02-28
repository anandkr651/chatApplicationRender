import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();

// it is a hook
export const useSocketContext = ()=>{
  return useContext(socketContext)
}


export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chatapplicationrender.onrender.com", {
        query: {
          userId: authUser.user._id,  //then go to server.js
        },
      });
      setSocket(socket)

      socket.on("getOnlineUser",(users)=>{  //comes from server.js
        setOnlineUser(users)
      })
      return()=>socket.close()
    }else{
      if(socket){
        socket.close();
        setSocket(null)
      }
    }
  },[authUser]);

  return(
    <socketContext.Provider value={{socket,onlineUser}}>
        {children}
    </socketContext.Provider>
  )
};
