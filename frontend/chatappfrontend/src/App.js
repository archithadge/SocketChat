import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import IndexPage from './Pages/IndexPage';
import ChatroomPage from './Pages/ChatroomPage'
import io from 'socket.io-client';

function App() {
  const [socket,setSocket]=React.useState(null);
  const demo=45;

  const setupSocket=()=>{
    const token=localStorage.getItem("Token");
    if(token && !socket){
      const newSocket=io("http://localhost:8000",{
        query:{
            token:localStorage.getItem("Token")
        },
    })

    newSocket.on('disconnect',()=>{
      setSocket(null);
      console.log("Socket disconnected");
      setTimeout(setupSocket,3000);
    })

    newSocket.on('connect',()=>{
      console.log("Socket connected...");
    })
    setSocket(newSocket);
    }
    
  }

  React.useEffect(()=>{
    setupSocket();
  },[])
  return <BrowserRouter>
  <Switch>
    <Route path="/" component={IndexPage} exact></Route>
    <Route path="/login" render={()=><LoginPage setupSocket={setupSocket}></LoginPage>} exact></Route>
    <Route path="/register" component={RegisterPage}exact></Route>
    <Route path="/dashboard" render={()=><DashboardPage socket={socket} ></DashboardPage>} exact></Route>
    <Route path="/chatroom/:id" render={()=><ChatroomPage socket={socket} demo={demo}></ChatroomPage>} exact></Route>
  </Switch>
  </BrowserRouter>
}

export default App;
