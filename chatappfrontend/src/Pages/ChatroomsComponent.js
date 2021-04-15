import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ChatItem } from 'react-chat-elements'
import { Link } from 'react-router-dom';
import './styles2.css'

const ChatroomsComponent = (props) => {
    return (
        <div className='chatrooms'>
            {props.chatrooms.map((chatroom,index) => (
                
                    <ChatItem key={chatroom._id} title={chatroom.name} onClick={()=>{props.setChat(chatroom._id,true,chatroom.name)}}/>
                
            ))}
        </div>
    );
};

export default ChatroomsComponent;