import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import IndexPage from './Pages/IndexPage';
import ChatroomPage from './Pages/ChatroomPage'

function App() {
  return <BrowserRouter>
  <Switch>
    <Route path="/" component={IndexPage} exact></Route>
    <Route path="/login" component={LoginPage}exact></Route>
    <Route path="/register" component={RegisterPage}exact></Route>
    <Route path="/dashboard" component={DashboardPage}exact></Route>
    <Route path="/chatroom/:id" component={ChatroomPage}exact></Route>
  </Switch>
  </BrowserRouter>
}

export default App;
