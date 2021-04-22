import React from 'react';
import { MessageBox } from 'react-chat-elements'



const MessagesComponent = (props) => {
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

export default MessagesComponent;