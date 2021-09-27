import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "react-chat-elements/dist/main.css";
import "../Pages/styles/loginpage.css";

class LoginPage extends Component {
  componentDidMount() {
    if (localStorage.getItem("Token")) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    var loginUser = () => {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      axios
        .post("http://localhost:8000/user/login", {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("uid", response.data.uid);
          this.props.setupSocket();
          this.props.history.push("/main2");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div id='main-login'>
        <h3>Login Page</h3>
          <div>Email</div>
          <input type="text" name="email" id="email" ref={emailRef} />
        

          <div>Password</div>
          <input
            type="text"
            name="password"
            id="password"
            ref={passwordRef}
          />
        
        <button id='button-login' variant="primary" onClick={loginUser}>Login</button>
      </div>
    );
  }
}

export default withRouter(LoginPage);
