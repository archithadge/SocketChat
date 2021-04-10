import React from 'react';
import Col from 'react-bootstrap/Col';
import { MessageBox } from 'react-chat-elements'
import { Link } from 'react-router-dom';


const ChatroomsComponent = (props) => {
    console.log(localStorage.getItem('uid'));
    return (
        <Col>
            {
                props.messages.map(message=>(
                    <MessageBox position={(localStorage.getItem('uid')==message.user || localStorage.getItem('uid')==message.userId || localStorage.getItem('uid')==message.sender)&&localStorage.getItem('uid')!=null?'right':'left'} text={message.message}/>
                ))
            }
        </Col>
    );
};

export default ChatroomsComponent;