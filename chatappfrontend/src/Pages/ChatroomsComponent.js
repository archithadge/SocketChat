import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ChatItem } from 'react-chat-elements'
import { Link } from 'react-router-dom';

const ChatroomsComponent = (props) => {
    return (
        <Row>
            {props.chatrooms.map(chatroom => (
                <Link to={"/chatroom/" + chatroom._id} key={chatroom._id}>
                    <ChatItem title={chatroom.name} />
                </Link>
            ))}
        </Row>
    );
};

export default ChatroomsComponent;