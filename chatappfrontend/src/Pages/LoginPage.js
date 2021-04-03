import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import  Form  from 'react-bootstrap/Form';
import  Col  from 'react-bootstrap/Col';
import  InputGroup  from 'react-bootstrap/InputGroup';
import  FormControl  from 'react-bootstrap/FormControl';
import  Button  from 'react-bootstrap/Button';
import 'react-chat-elements/dist/main.css';
// MessageBox component
import { ChatItem } from 'react-chat-elements';

class LoginPage extends Component {
    componentDidMount(){
      if(localStorage.getItem('Token')){
        this.props.history.push('/dashboard');
        
      }
    }
    render() {
        const emailRef=React.createRef();
        const passwordRef=React.createRef();

  

        var loginUser=()=>{
            const email=emailRef.current.value;
            const password=passwordRef.current.value;
    
            axios.post("http://localhost:8000/user/login",{
                email,
                password,
            }).then((response)=>{
                console.log(response.data);
                localStorage.setItem("Token",response.data.token);
                localStorage.setItem("uid",response.data.uid);
                this.props.setupSocket();
                this.props.history.push('/dashboard');
            }).catch((err)=>{
                console.log(err);
            })
        }

        return (
            
            <div>

<ChatItem
    avatar={'https://facebook.github.io/react/img/logo.svg'}
    alt={'Reactjs'}
    title={'Facebook'}
    subtitle={'What are you doing?'}
    date={new Date()}
    unread={0} />
                
  <Form.Group >
    <Form.Label>Email address</Form.Label>
    <Form.Control type="text" name="email" id="email" ref={emailRef} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group >
    <Form.Label>Password</Form.Label>
    <Form.Control type="text" name="password" id="password" ref={passwordRef} />
  </Form.Group>
  <Button variant="primary" onClick={loginUser}>
    Submit
  </Button>

                {/* <input type="text" name="email" id="email" ref={emailRef}/> */}
                {/* <input type="text" name="password" id="password" ref={passwordRef}/> */}
                {/* <button onClick={loginUser}>Login</button> */}
            </div>
            
        );
    }
}

export default withRouter(LoginPage);