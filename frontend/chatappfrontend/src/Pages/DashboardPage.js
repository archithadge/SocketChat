import React, { Component } from 'react';

class DashboardPage extends Component {
    render() {
        return (
            <div>
                <input type="text" name="chatroomName" id="chatroomName"/>
                <button>Create chatroom</button> 
            </div>
        );
    }
}

export default DashboardPage;