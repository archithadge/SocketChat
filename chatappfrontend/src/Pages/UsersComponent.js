import React from "react";
import { ChatItem } from "react-chat-elements";


const UsersComponent = (props) => {
  return (
    <div className="chatrooms">
      {props.users.map((user, index) => (
        <ChatItem
          key={user._id}
          title={user.name}
          onClick={() => {
            props.setChat(user._id, false, user.name);
          }}
        />
      ))}
    </div>
  );
};

export default UsersComponent;
