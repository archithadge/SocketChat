import React, { Component } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class RegisterPage extends Component {



    render() {
        const nameRef = React.createRef();
        const emailRef = React.createRef();
        const passwordRef = React.createRef();

        var registerUser = () => {
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            axios.post("http://localhost:8000/user/register", {
                name,
                email,
                password,
            }).then((response) => {
                console.log(response.data);
                this.props.history.push('/login');
            }).catch((err) => {
                console.log(err);
            })
        }


        return (
            <div>
                <div id='main-login'>
                    <h3>Registration Page</h3>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" id="name" ref={nameRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" name="email" id="email" ref={emailRef} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            id="password"
                            ref={passwordRef}
                        />
                    </Form.Group>
                    <Button id='button-login' variant="primary" onClick={registerUser}>Register</Button>
                </div>
            </div>
        );
    }


}

export default RegisterPage;