import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import ChatroomsComponent from './ChatroomsComponent';
import MessagesComponent from './MessagesComponent';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const MainPage = ({socket}) => {

    const [chatrooms, setChatrooms] = useState([
        {
            "_id": "605a2271b9e1476d944b6ebc",
            "name": "chatroom1",
            "createdAt": "2021-03-23T17:16:33.850Z",
            "updatedAt": "2021-03-23T17:16:33.850Z",
            "__v": 0
        },
        {
            "_id": "605a227eb9e1476d944b6ebd",
            "name": "chatroom2",
            "createdAt": "2021-03-23T17:16:46.626Z",
            "updatedAt": "2021-03-23T17:16:46.626Z",
            "__v": 0
        },
        {
            "_id": "605e1392c1a22cc0437386ab",
            "name": "ha ha",
            "createdAt": "2021-03-26T17:02:10.356Z",
            "updatedAt": "2021-03-26T17:02:10.356Z",
            "__v": 0
        },
        {
            "_id": "606605e9dc8c9561ef9509f2",
            "name": "65",
            "createdAt": "2021-04-01T17:42:01.132Z",
            "updatedAt": "2021-04-01T17:42:01.132Z",
            "__v": 0
        }
    ]);
    const [users, setUsers] = useState([
        {
            "_id": "602bc89453f0bcc98cbb2d9b",
            "name": "archit"
        },
        {
            "_id": "602bceb553f0bcc98cbb2d9c",
            "name": "a"
        },
        {
            "_id": "60310ffb44aa827ea7a3e010",
            "name": "aa"
        },
        {
            "_id": "603660a61feb01998bf2f7be",
            "name": "2"
        },
        {
            "_id": "603661431feb01998bf2f7bf",
            "name": "10"
        },
        {
            "_id": "60376a1c60f4a65125abdb63",
            "name": "6"
        },
        {
            "_id": "603a2b1470acc9b020df8237",
            "name": "aditya"
        },
        {
            "_id": "604a008a474ef1671a043bb4",
            "name": "feku"
        },
        {
            "_id": "604c8e57ad4cb7befcaef1df",
            "name": "12"
        },
        {
            "_id": "604c919ead4cb7befcaef1e5",
            "name": "abc2@gmail.com"
        },
        {
            "_id": "605f050dbb5c8df90fda884a",
            "name": "shalini"
        },
        {
            "_id": "605f051fbb5c8df90fda884b",
            "name": "vikas"
        }
    ]);
    const [messages, setMessages] = useState([
        {
            "_id": "605f637a5bd36dc91090a1ab",
            "chatroom": "605a227eb9e1476d944b6ebd",
            "user": "603660a61feb01998bf2f7be",
            "message": "hii",
            "__v": 0
        },
        {
            "_id": "606204de19f16735c350f20a",
            "chatroom": "605a227eb9e1476d944b6ebd",
            "user": "603660a61feb01998bf2f7be",
            "message": "hh",
            "__v": 0
        },
        {
            "_id": "606eccca79a79a7e672d1703",
            "chatroom": "605a227eb9e1476d944b6ebd",
            "user": "603660a61feb01998bf2f7be",
            "message": "ohhh",
            "__v": 0
        }
    ]);
    const [messagesFromDB, setMessagesDB] = useState([
        {
            "_id": "605f637a5bd36dc91090a1ab",
            "chatroom": "605a227eb9e1476d944b6ebd",
            "user": "603660a61feb01998bf2f7be",
            "message": "hii",
            "__v": 0
        },
        {
            "_id": "606204de19f16735c350f20a",
            "chatroom": "605a227eb9e1476d944b6ebd",
            "user": "603660a61feb01998bf2f7be",
            "message": "hh",
            "__v": 0
        },
        {
            "_id": "606eccca79a79a7e672d1703",
            "chatroom": "605a227eb9e1476d944b6ebd",
            "user": "603660a61feb01998bf2f7be",
            "message": "ohhh",
            "__v": 0
        }
    ]);
    

    // const getUsers=()=>{
    //     axios.get('http://localhost:8000/user/users',{
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem("Token")
    //         }
    //     }).then(response=>{
    //         setUsers(response.data);
    //         console.log("Users-->",response.data);
    //     }).catch(err=>{
    //         setTimeout(getUsers,10000);
    //     })
    // }

    // const getChatrooms = () => {
    //     axios.get('http://localhost:8000/chatroom', {
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem("Token")
    //         }
    //     }).then((response) => {
    //         setbol(true);
    //         console.log(localStorage.getItem("Token"));
    //         console.log(response.data);
    //         setChatrooms(response.data);
    //     }).catch((err) => {
    //         // console.log(err.response);
    //         console.log(localStorage.getItem("Token"));
    //         setTimeout(getChatrooms, 10000);
    //     })
    // }

    // const createChatroom = () => {
    //     console.log('Creating chatroom')
    //     axios.post('http://localhost:8000/chatroom',
    //         { name: inputRef.current.value },
    //         { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } }).then(response=>{
    //             // props.history.push('/dashboard');
    //             window.location.reload();
    //         })
    // }

    // React.useEffect(()=>{

    // })

    


    return (
            <Container fluid>
                <Row>
                <Col md={3}>
            <ChatroomsComponent chatrooms={chatrooms}/>
            <ChatroomsComponent chatrooms={users}/>
            </Col>
            <Col md={9}>
            <MessagesComponent messages={messagesFromDB}/>
            <MessagesComponent messages={messages}/>
            </Col>
            </Row>
            </Container>
            
            
            
            
            
            
        
    );
};

export default MainPage;