import React from "react";
import { ChatItem } from "react-chat-elements";


const UsersComponent = (props) => {
  return (
    <div className="chatrooms">
      {props.users.map((user, index) => (
        <ChatItem
          key={user._id}
          avatar={user.profilephoto}
          title={user.firstname+" "+user.lastname}
          onClick={() => {
            props.setChat(user._id, false, user.firstname+" "+user.lastname);
          }}
        />
      ))}
    </div>
  );
};

export default UsersComponent;
