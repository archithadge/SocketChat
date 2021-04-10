import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ChatItem } from 'react-chat-elements'
import { Link } from 'react-router-dom';

const UsersComponent = (props) => {
    return (
        <Row>
            {props.users.map(user => (
                <Link to={"/personal/" + user._id} key={user._id}>
                    <ChatItem title={user.name} />
                </Link>
            ))}
        </Row>
    );
};

export default UsersComponent;