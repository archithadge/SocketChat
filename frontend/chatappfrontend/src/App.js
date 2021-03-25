import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {SocketContext, socket} from './Services/Socket';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import IndexPage from './Pages/IndexPage';
import ChatroomPage from './Pages/ChatroomPage'
import io from 'socket.io-client';

function App() {

  return <BrowserRouter>
  <Switch>
    <SocketContext.Provider value={socket}>
    <Route path="/" component={IndexPage} exact></Route>
    <Route path="/login" render={()=><LoginPage ></LoginPage>} exact></Route>
    <Route path="/register" component={RegisterPage}exact></Route>
    <Route path="/dashboard" render={()=><DashboardPage  ></DashboardPage>} exact></Route>
    <Route path="/chatroom/:id" render={()=><ChatroomPage ></ChatroomPage>} exact></Route>
    </SocketContext.Provider></Switch>
  </BrowserRouter>
}

export default App;
