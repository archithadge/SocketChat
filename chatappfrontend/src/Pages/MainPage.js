import React from 'react';

const MainPage = () => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const [contacts, setContacts] = React.useState([]);
    const [messages, setMessages] = React.useState([]);

    const getChatrooms = () => {
        axios.get('http://localhost:8000/chatroom', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then((response) => {
            setbol(true);
            console.log(localStorage.getItem("Token"));
            console.log(response.data);
            setChatrooms(response.data);
        }).catch((err) => {
            // console.log(err.response);
            console.log(localStorage.getItem("Token"));
            setTimeout(getChatrooms, 10000);
        })
    }

    const getUsers=()=>{
        axios.get('http://localhost:8000/user/users',{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then(response=>{
            setContacts(response.data);
            console.log("Users-->",response.data);
        }).catch(err=>{
            setTimeout(getUsers,10000);
        })
    }

    return (
        <div>
            <div>
                <div className='Chatrooms'>Chatrooms</div>
                <div className='Contacts'>Contacts</div>
            </div>
            <div className='Messages'>Messages</div>
        </div>
    );
};

export default MainPage;