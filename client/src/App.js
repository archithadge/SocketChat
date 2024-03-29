import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import IndexPage from './Pages/IndexPage';
import io from 'socket.io-client';
import ResponsiveDrawer from './Pages/ResponsiveMainPage';


function App() {
  const [socket,setSocket]=React.useState(null);
  const demo=45;

  const setupSocket=()=>{
    const token=localStorage.getItem("Token");
    console.log('Currently setting socket for token ',token);
    if(token==null)return;
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

  React.useEffect(()=>{
    setupSocket();
  },[])
  return <BrowserRouter>
  <Switch>
    <Route path="/" component={IndexPage} exact></Route>
    <Route path="/main2" render={()=><ResponsiveDrawer socket={socket} ></ResponsiveDrawer>}></Route>
    <Route path="/login" render={()=><LoginPage setupSocket={setupSocket}></LoginPage>} exact></Route>
    <Route path="/register" component={RegisterPage}exact></Route>
    {/* <Route path="/dashboard" render={()=><DashboardPage socket={socket} ></DashboardPage>} exact></Route> */}
    {/* <Route path="/main" render={()=><MainPage socket={socket} ></MainPage>} exact></Route> */}
    {/* <Route path="/chatroom/:id" render={()=><ChatroomPage socket={socket} demo={demo}></ChatroomPage>} exact></Route> */}
    {/* <Route path="/personal/:id" render={()=><PersonalMessagePage socket={socket} ></PersonalMessagePage>} exact></Route> */}
  </Switch>
  </BrowserRouter>
}

export default App;



{/* <Route path="/personal/:id" render={()=><PersonalMessagePage ></PersonalMessagePage>} exact></Route> */}