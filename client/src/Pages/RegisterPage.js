import React, { Component } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class RegisterPage extends Component {

    state = {
 
        // Initially, no file is selected
        selectedFile: null
      };
      
      // On file select (from the pop up)
      onFileChange = event => {
      
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };

    render() {
        const firstnameRef = React.createRef();
        const lastnameRef = React.createRef();
        const bioRef = React.createRef();
        const emailRef = React.createRef();
        const passwordRef = React.createRef();
        const profilephotoRef=React.createRef();

        var registerUser = () => {
            const firstname = firstnameRef.current.value;
            const lastname = lastnameRef.current.value;
            const bio = bioRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const profilephoto = profilephotoRef;

            console.log(this.state.selectedFile);

            let formData = new FormData();
            formData.append('firstname',firstname);
            formData.append('lastname',lastname);
            formData.append('email',email);
            formData.append('bio',bio);
            formData.append('password',password);
            formData.append('profilephoto',this.state.selectedFile);

            axios.post("http://localhost:8000/user/register", formData,{
                headers: {
                    "Content-type": "multipart/form-data"
                  }
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
                    <div>First Name</div>
                    <input type="text" name="firstname" id="name" ref={firstnameRef}/>
                    <div>Last Name</div>
                    <input type="text" name="lastname" id="name" ref={lastnameRef}/>
                    <div>Email</div>
                    <input type="text" name="email" id="name" ref={emailRef}/>
                    <div>Bio</div>
                    <input type="text" name="bio" id="email" ref={bioRef}/>
                    <div>Profile Pic</div>
                    <input type="file" name="profilephoto" id="email" onChange={this.onFileChange} ref={profilephotoRef}/>
                    <div>Password</div>
                    <input type="text"
                            name="password"
                            id="password"
                            ref={passwordRef}/>
                    <button id='button-login' variant="primary" onClick={registerUser}>Register</button>
                    {/* <Form.Group>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstname" id="name" ref={firstnameRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastname" id="name" ref={lastnameRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" id="name" ref={emailRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" name="bio" id="email" ref={bioRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile pic</Form.Label>
                        <Form.Control type="file" name="profilephoto" id="email" onChange={this.onFileChange} ref={profilephotoRef} />
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
                    <Button id='button-login' variant="primary" onClick={registerUser}>Register</Button> */}
                </div>
            </div>
        );
    }


}

export default RegisterPage;