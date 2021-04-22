import React, { Component } from 'react';
import axios from 'axios';


class RegisterPage extends Component {

    
    
    render() {
        const nameRef=React.createRef();
        const emailRef=React.createRef();
        const passwordRef=React.createRef();

        var registerUser=()=>{
            const name=nameRef.current.value;
            const email=emailRef.current.value;
            const password=passwordRef.current.value;
    
            axios.post("http://localhost:8000/user/register",{
                name,
                email,
                password,
            }).then((response)=>{
                console.log(response.data);
                this.props.history.push('/login');
            }).catch((err)=>{
                console.log(err);
            })
        }

        
        return (
            <div>
                <input type="text" name="name" id="name" ref={nameRef}/>
                <input type="text" name="email" id="email" ref={emailRef}/>
                <input type="text" name="password" id="password" ref={passwordRef}/>
                <button onClick={registerUser}>Register</button>
            </div>
        );
    }

    
}

export default RegisterPage;