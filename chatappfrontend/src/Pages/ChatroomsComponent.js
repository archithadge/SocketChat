import React from 'react';
import Col from 'react-bootstrap/Col';
import { ChatItem } from 'react-chat-elements'
import { Link } from 'react-router-dom';

const ChatroomsComponent = (props) => {
    return (
        <Col>
            {props.chatrooms.map(chatroom => (
                <Link to={"/chatroom/" + chatroom._id} key={chatroom._id}>
                    <ChatItem title={chatroom.name} />
                </Link>
            ))}
        </Col>
    );
};

export default ChatroomsComponent;