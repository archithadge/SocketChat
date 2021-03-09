import React from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Message from './Message.js';

const ChatroomPage = ({ match, socket }) => {
    const chatroomId = match.params.id;
    const [messages, setMessages] = React.useState([]);
    const [messagesFromDB, setMessagesDB] = React.useState([]);
    const messageRef = React.useRef();

    const getMessagesFromDB = () => {
        axios.post('http://localhost:8000/chatroom/messages', {
            chatroomId: chatroomId
        },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("Token")
                }
            }).then((response) => {
                console.log(response.data);
                setMessagesDB(response.data);
            }).catch((error) => {
                console.log("Error occured ..!", error);
            })
    }

    const sendMessage = () => {
        console.log("Messages", messages);

        if (socket) {
            socket.emit('chatroomMessage', {
                chatroomId,
                message: messageRef.current.value
            })
        }
    }

    React.useEffect(() => {
        console.log("Setting up");
        getMessagesFromDB();
        socket.once('newMessage', (message) => {
            console.log("inside new msg");
            const newMessages = [...messages, message];
            setMessages(newMessages);
        })
    }, [])
    React.useEffect(() => {
        socket.emit('joinRoom', {
            chatroomId
        })

        // socket.on('newMessage',(message)=>{
        //     console.log("newMessage event fired");
        //     setMessages([...messages,message]);
        // })

        return () => {
            socket.emit('leaveRoom', {
                chatroomId
            })
        }
    }, [])

    // const socket=io('http://localhost:8000',{
    //     query:{
    //         token=localStorage.getItem("Token")
    //     }
    // })
    return (
        <div>
            Chatroom Page
            
            {/* <button onClick={getMessagesFromDB}>Test</button> */}
            <div className='messages'>
            <div>
                {messagesFromDB.map((message, i) => (
                    // <div key={i}>{message.name}:---{message.message}</div>
                    <Message key={i} user={message._id} msg={message.message}></Message>
                ))}
            </div>
            <div>
                {messages.map((message, i) => (
                    // <div key={i}>{message.name}:---{message.message}</div>
                    <Message key={i} user={message.userId} msg={message.message}></Message>
                ))}
            </div>
            </div>
            <div>
            <input type='text' ref={messageRef}></input>
            <button onClick={sendMessage} ></button>
            </div>
        </div>
    );
};

export default withRouter(ChatroomPage);