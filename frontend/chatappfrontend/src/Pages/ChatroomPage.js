import React from 'react';
import io from 'socket.io-client';

const ChatroomPage = ({match}) => {
    const chatroomId=match.params.id;
    const socket=io("http://localhost:8000",{
        query:{
            token:localStorage.getItem("Token")
        },
    })
    return (
        <div>
            Chatroom Page
        </div>
    );
};

export default ChatroomPage;