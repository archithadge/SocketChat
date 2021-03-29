import React, {useState, useContext, useCallback, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import {useJwt} from 'react-jwt'
import Message from './Message.js';
import useSound from 'use-sound';
import boopSfx1 from '../Sounds/recieve.mp3';
import boopSfx2 from '../Sounds/send.mp3';


const ChatroomPage = ({ match,socket }) => {
    const chatroomId = match.params.id;
    const [messages, setMessages] = React.useState([]);
    const [messagesFromDB, setMessagesDB] = React.useState([]);
    // const [token, setToken] = React.useState(null);
    const { decodedToken, isExpired } = useJwt(localStorage.getItem('Token'));
    const messageRef = React.useRef();
    const messagesRef = React.useRef();
    const [recieve] = useSound(boopSfx1);
    const [send] = useSound(boopSfx2);

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
            console.log('Socket exists');
            socket.emit('chatroomMessage', {
                chatroomId:chatroomId,
                message: messageRef.current.value
            })
        }
    }

    React.useEffect(()=>{
        getMessagesFromDB();
        
    },[]);

    React.useEffect(()=>{
        var element = document.getElementById("messages");
            element.scrollTop = element.scrollHeight;
    },[]);

    React.useEffect(() => {
        // console.log("Setting up",decodedToken);
        if(!socket)return;
        console.log("UID socket",localStorage.getItem('uid'))
        // getMessagesFromDB();
        socket.once('newMessage', (message) => {
            if(message.userId==localStorage.getItem('uid')){
                send();
            }else{
                recieve();
            }
            console.log("inside new msg");
            const newMessages = [...messages, message];
            setMessages(newMessages);
            var element = document.getElementById("messages");
            element.scrollTop = element.scrollHeight;
        })
    })
    React.useEffect(() => {
        if(!socket)return;
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
    }, [socket])

    // const socket=io('http://localhost:8000',{
    //     query:{
    //         token=localStorage.getItem("Token")
    //     }
    // })
    return (
        <div>
            Chatroom Page
            
            {/* <button onClick={getMessagesFromDB}>Test</button> */}
            <div className='messages' id="messages">
            <div>
                {messagesFromDB.map((message, i) => (
                    // <div key={i}>{message.name}:---{message.message}</div>
                    <Message key={i} Class={localStorage.getItem('uid')==message.user?"ownMessageBody":"otherMessageBody"} user={message.user} msg={message.message}></Message>
                ))}
            </div>
            <div>
                {messages.map((message, i) => (
                    // <div key={i}>{message.name}:---{message.message}</div>
                    <Message key={i} Class={localStorage.getItem('uid')==message.userId?"ownMessageBody":"otherMessageBody"} user={message.userId} msg={message.message}></Message>
                ))}
            </div>
            </div>
            <div>
            <input type='text' ref={messageRef}></input>
            <button onClick={sendMessage} >Send</button>
            </div>
        </div>
    );
};

export default withRouter(ChatroomPage);