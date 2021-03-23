import io from 'socket.io-client';

const newsocket=io("http://localhost:8000",{
        query:{
            token:localStorage.getItem("Token")
        },
    })

    newsocket.on('disconnect',()=>{
      console.log("Socket disconnected");
    //   setTimeout(setupSocket,3000);
    })

    newsocket.on('connect',()=>{
      console.log("Socket connected...");
    })
export const socket=newsocket;