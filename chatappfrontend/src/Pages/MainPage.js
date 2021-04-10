import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';

const MainPage = ({socket}) => {

    const [chatrooms, setChatrooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messagesFromDB, setMessagesDB] = useState([]);
    

    const getUsers=()=>{
        axios.get('http://localhost:8000/user/users',{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then(response=>{
            setUsers(response.data);
            console.log("Users-->",response.data);
        }).catch(err=>{
            setTimeout(getUsers,10000);
        })
    }

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

    const createChatroom = () => {
        console.log('Creating chatroom')
        axios.post('http://localhost:8000/chatroom',
            { name: inputRef.current.value },
            { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } }).then(response=>{
                // props.history.push('/dashboard');
                window.location.reload();
            })
    }

    


    return (
        <Container>

        </Container>
    );
};

export default MainPage;