import io from 'socket.io-client';
import React from 'react';
const socket = io("http://localhost:8000",{
    query:{
        token:localStorage.getItem("Token")
    },
})

socket.on('disconnect',()=>{

  console.log("Socket disconnected");

})

socket.on('connect',()=>{
  console.log("Socket connected...");
})

export {socket};
export const SocketContext = React.createContext();