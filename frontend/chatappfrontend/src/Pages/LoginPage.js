import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
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
                <input type="text" name="email" id="email" ref={emailRef}/>
                <input type="text" name="password" id="password" ref={passwordRef}/>
                <button onClick={loginUser}>Login</button>
            </div>
            
        );
    }
}

export default withRouter(LoginPage);