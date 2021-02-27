import React from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

const ChatroomPage = ({match,socket}) => {
    const chatroomId=match.params.id;
    const [messages,setMessages]=React.useState([]);
    const messageRef=React.useRef();

    const sendMessage=()=>{
        
        if(socket){
            socket.emit('chatroomMessage',{
                chatroomId,
                message:messageRef.current.value
            })
        }
    }

    React.useEffect(()=>{
        console.log("Setting up");
        socket.once('newMessage',(message)=>{
            console.log("inside new msg");
            const newMessages=[...messages,message];
            setMessages(newMessages);
        })
    })
    React.useEffect(()=>{
        socket.emit('joinRoom',{
            chatroomId
        })

        // socket.on('newMessage',(message)=>{
        //     console.log("newMessage event fired");
        //     setMessages([...messages,message]);
        // })

        return ()=>{
            socket.emit('leaveRoom',{
                chatroomId
            })
        }
    },[])
    
    // const socket=io('http://localhost:8000',{
    //     query:{
    //         token=localStorage.getItem("Token")
    //     }
    // })
    return (
        <div>
            Chatroom Page
            <input type='text' ref={messageRef}></input>
            <button onClick={sendMessage} ></button>
            <div>
                {messages.map((message,i)=>(
                    <div key={i}>{message.name}:---{message.message}</div>
                ))}
            </div>
        </div>
    );
};

export default withRouter(ChatroomPage);