import React from 'react';
import './styles.css'

const Message = (props) => {
    return (
        <div className="messageBody">
            <div>{props.user}</div>
            <div>{props.msg}</div>
            {/* <div>Time</div> */}
        </div>
    );
};

export default Message;