import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { withRouter } from 'react-router-dom';
import ChatroomsComponent from './ChatroomsComponent';
import MessagesComponent from './MessagesComponent';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UsersComponent from './UsersComponent';
import axios from 'axios';
import './styles2.css'
import useSound from 'use-sound';
import boopSfx1 from '../Sounds/recieve.mp3';
import boopSfx2 from '../Sounds/send.mp3';
import Dropdown from 'react-bootstrap/Dropdown';


const MainPage = ({ socket, history }) => {



    const [ispublic, setPublic] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentChatName, setCurrentChatName] = useState(null);
    const [chatrooms, setChatrooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messagesFromDB, setMessagesDB] = useState([]);
    const messageRef = React.useRef();
    const [recieve] = useSound(boopSfx1);
    const [send] = useSound(boopSfx2);



    const setChat = (currentChat, ispublic, currentChatName) => {
        setCurrentChat(currentChat);
        setPublic(ispublic);
        setCurrentChatName(currentChatName);
    }



    const generateId = (id1, id2) => {
        var elements = [id1, id2];
        var a = elements.sort((a, b) => a.localeCompare(b));
        console.log("PM Id", a[0] + a[1]);
        return a[0] + a[1];
    }

    const sendMessage = () => {
        console.log("Messages", messages);

        if (socket) {
            console.log('Socket exists');
            socket.emit('chatroomMessage', {
                chatroomId: currentChat,
                message: messageRef.current.value
            })
        }
    }

    const logout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('uid');
        socket.off();
        socket.disconnect();
        history.push('/login');
    }

    const sendMessageP = () => {
        console.log("Messages", messages);

        if (socket) {
            console.log('Socket exists');
            socket.emit('personalMessage', {
                receiverId: currentChat,
                chatroom: generateId(localStorage.getItem('uid'), currentChat),
                message: messageRef.current.value
            })
        }
    }

    React.useEffect(() => {
        // console.log("Setting up",decodedToken);
        if (!socket) return;
        // console.log("UID socket",localStorage.getItem('uid'))
        // getMessagesFromDB();
        socket.once('newMessage', (message) => {
            console.log('event');
            if (message.userId == localStorage.getItem('uid')) {
                send();
            } else {
                recieve();
            }
            console.log("inside new msg", message);
            if ((ispublic && message.chatroom == currentChat) || (ispublic == false && (message.receiver == localStorage.getItem('uid') || message.userId == localStorage.getItem('uid')))) {

                const newMessages = [...messages, message];

                setMessages(newMessages);
            }
            // var element = document.getElementById("messages");
            // element.scrollTop = element.scrollHeight;
        })

        return function cleanup() { socket.off('newMessage') };
    })

    const getMessagesFromDBP = () => {
        axios.post('http://localhost:8000/personal/messages', {
            chatroomId: generateId(localStorage.getItem('uid'), currentChat)
        },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("Token")
                }
            }).then((response) => {
                console.log(response.data);
                setMessagesDB(response.data);
            }).catch((error) => {
                console.log("Error occured ..!", error);
            })
    }

    const getMessagesFromDB = () => {
        axios.post('http://localhost:8000/chatroom/messages', {
            chatroomId: currentChat
        },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("Token")
                }
            }).then((response) => {
                console.log(response.data);
                setMessagesDB(response.data);
            }).catch((error) => {
                console.log("Error occured ..!", error);
            })
    }


    const getUsers = () => {
        axios.get('http://localhost:8000/user/users', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then(response => {
            setUsers(response.data);
            console.log("Users-->", response.data);
        }).catch(err => {
            setTimeout(getUsers, 10000);
        })
    }

    const getChatrooms = () => {
        axios.get('http://localhost:8000/chatroom', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then((response) => {
            // setbol(true);
            console.log(localStorage.getItem("Token"));
            console.log(response.data);
            setChatrooms(response.data);
        }).catch((err) => {
            // console.log(err.response);
            console.log(localStorage.getItem("Token"));
            setTimeout(getChatrooms, 10000);
        })
    }

    // const createChatroom = () => {
    //     console.log('Creating chatroom')
    //     axios.post('http://localhost:8000/chatroom',
    //         { name: inputRef.current.value },
    //         { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } }).then(response=>{
    //             // props.history.push('/dashboard');
    //             window.location.reload();
    //         })
    // }

    React.useEffect(() => {
        getChatrooms();
        getUsers();



    }, [])

    React.useEffect(() => {
        if (!socket) return;
        socket.emit('initialize');


    }, [socket])









    React.useEffect(() => {
        console.log('public ', ispublic, ' currentChat ', currentChat);
        if (ispublic == true) {
            getMessagesFromDB();
        } if (ispublic == false) {
            getMessagesFromDBP();
        }
        setMessages([]);
    }, [currentChat])


    return (
        <div className='main'>

            <div className='sidebar'>
                <div className='label'>Public Chatrooms</div>

                <ChatroomsComponent chatrooms={chatrooms} setChat={setChat} />
                <div className='label'>Personal Chats</div>
                <UsersComponent users={users} setChat={setChat} />
            </div>
            <div className='messagesection'>
                <div>{currentChatName}</div>
                <div className='messages'>
                    <MessagesComponent messages={messagesFromDB} />
                    <MessagesComponent messages={messages} />
                </div>
                <div>
                    <input type='text' ref={messageRef}></input>
                    <button onClick={() => {
                        if (ispublic) {
                            sendMessage();
                        } else {
                            sendMessageP();
                        }
                    }}>Send</button>
                </div>
            </div>
            <button onClick={logout}>Logout</button>
        </div>







    );
};

export default withRouter(MainPage);











{/* <Container fluid>
                <Row>
                <Col md={3}>
            <ChatroomsComponent  chatrooms={chatrooms} setChat={setChat}/>
            <UsersComponent users={users} setChat={setChat}/>
            </Col>
            <Col md={9}>
            <MessagesComponent messages={messagesFromDB}/>
            <MessagesComponent messages={messages}/>
            </Col>
            </Row>
            </Container> */}