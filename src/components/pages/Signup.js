import React, { Component } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import VisualizationV1 from '../visualizations/VisualizationV1'
//#479042
//#003798

export default function SignupView() {
  let navigate = useNavigate();
  const [signupProcessState, setSignupProcessState] = useState("idle");

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setSignupProcessState("processing");
    try {
      const result = await axios.post(2000 + '/registerBasic', {
        username: event.target.username.value,
        password: event.target.password.value
      })
      console.log(result);
      setSignupProcessState("success");
      setTimeout(() => {
        setSignupProcessState("idle")
        navigate("/login", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);
      setSignupProcessState("error");
      setTimeout(() => setSignupProcessState("idle"), 1500);
    }
  };

  let signupUIControls = null;
  switch (signupProcessState) {
    case "idle":
      signupUIControls = <button type="submit">Add Account</button>
      break;

    case "processing":
      signupUIControls = <span style={{ color: 'blue' }}>Processing signup...</span>
      break;

    case "success":
      signupUIControls = <span style={{ color: 'green' }}>User created</span>
      break;

    case "error":
      signupUIControls = <span style={{ color: 'red' }}>Error</span>
      break;

    default:
      signupUIControls = <button type="submit">Add Account</button>
  }

  return (
    <div className='signup_container'>
      <div className="signup_container_image">
        <img src={require('../images/signup.jpg')} alt="signupimage"></img>
      </div>
      <h1>SIGN UP</h1>

      <form onSubmit={handleSignupSubmit}>
        <div className="">
          <div>
            <label>Username</label><br/>
            <input type="text" placeholder="User Name" required/>
          </div>
          <br/>
          <div>
            <label>Password</label><br/>
            <input type="password" placeholder="Password"  required/>
          </div>
          <br/>
          <div>
            {signupUIControls}
          </div>
        </div>
      </form>
    </div>
  )
}