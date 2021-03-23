import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import  Spinner  from 'react-bootstrap/Spinner';

const DashboardPage = (props) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const inputRef = React.useRef();
    const logoutRef = React.useRef();
    const [bol,setbol]=React.useState(false);

    function chatMap(chatrooms){
        return chatrooms.map(chatroom => (
            <div key={chatroom._id} >Name is {chatroom.name}
                <Link to={"/chatroom/" + chatroom._id}>Join</Link>
            </div>
        ))
    }

    function userMap(users){
        return users.map(user => (
            <div key={user._id} >Name is {user.name}
                {/* <Link to={"/chatroom/" + user._id}>Join</Link> */}
                <br></br>Ikde kaam suru aahe
            </div>
        ))
    }

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

    const logout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('uid');
        props.socket.off();
        props.socket.disconnect();
        props.history.push('/login');
    }

    React.useEffect(() => {
        getChatrooms();
        getUsers();
    }, [])
    return (
        <div>
            <input type="text" name="chatroomName" id="chatroomName" ref={inputRef} />
            <button onClick={createChatroom}>Create chatroom</button>
            <div>{bol?chatMap(chatrooms):<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>}
            </div>

            {/* <div>{bol?userMap(users):<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>}
            </div> */}
            
            <button ref={logoutRef} onClick={logout}>Logout</button>
            <Button variant="primary">Btn</Button>
        </div>
    );
};

export default withRouter(DashboardPage);