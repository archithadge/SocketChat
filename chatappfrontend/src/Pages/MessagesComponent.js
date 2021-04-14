import React from 'react';
import Col from 'react-bootstrap/Col';
import { MessageBox } from 'react-chat-elements'
import { Link } from 'react-router-dom';


const ChatroomsComponent = (props) => {
    console.log(localStorage.getItem('uid'));
    return (
        <div>
            {
                props.messages.map((message,index)=>(
                    <MessageBox title={message.name} key={index} position={(localStorage.getItem('uid')==message.user || localStorage.getItem('uid')==message.userId || localStorage.getItem('uid')==message.sender)&&localStorage.getItem('uid')!=null?'right':'left'} text={message.message}/>
                ))
            }
        </div>
    );
};

export default ChatroomsComponent;