import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [chatrooms,setChatrooms]=React.useState([]);
    const inputRef=React.useRef();

    const getChatrooms=()=>{
        axios.get('http://localhost:8000/chatroom',{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("Token")
            }
        }).then((response)=>{
            console.log(localStorage.getItem("Token"));
            console.log(response.data);
            setChatrooms(response.data);
        }).catch((err)=>{
            // console.log(err.response);
            console.log(localStorage.getItem("Token"));
            setTimeout(getChatrooms,10000);
        })
    }

    const createChatroom=()=>{
        console.log('Creating chatroom')
        axios.post('http://localhost:8000/chatroom',{name:inputRef.current.value},{headers:{Authorization:"Bearer "+localStorage.getItem("Token")}})
    }

    React.useEffect(()=>{
        getChatrooms();
    },[])
    return (
        <div>
            <input type="text" name="chatroomName" id="chatroomName" ref={inputRef}/>
            <button onClick={createChatroom}>Create chatroom</button>
            {chatrooms.map(chatroom=>(
                <div key={chatroom._id} >Name is {chatroom.name}
                <Link to={"/chatroom/"+chatroom._id}>Join</Link>
                </div>
            ))}
        </div>
    );
};

export default DashboardPage;