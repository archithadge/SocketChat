import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ChatItem } from 'react-chat-elements'
import { Link } from 'react-router-dom';

const UsersComponent = (props) => {
    return (
        <div className='chatrooms'>
            {props.users.map((user,index) => (
                
                    <ChatItem key={user._id} title={user.name} onClick={()=>{props.setChat(user._id,false,user.name)}}/>
            
            ))}
        </div>
    );
};

export default UsersComponent;