import React, { Component } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import VisualizationV1 from '../visualizations/VisualizationV1'
//#479042
//#003798

export default function SignupView() {
  let navigate = useNavigate();
  const [ signupProcessState, setSignupProcessState ] = useState("idle");

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setSignupProcessState("processing");
    try {
      const result = await axios.post(2000 + '/registerBasic', {
        username: event.target.username.value,
        email: event.target.email.value,
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
  switch(signupProcessState) {
    case "idle":
      signupUIControls = <button type="submit">Sign up</button>
      break;

    case "processing":
      signupUIControls = <span style={{color: 'blue'}}>Processing signup...</span>
      break;

    case "success":
      signupUIControls = <span style={{color: 'green'}}>User created</span>
      break;

    case "error":
      signupUIControls = <span style={{color: 'red'}}>Error</span>
      break;

    default:
      signupUIControls = <button type="submit">Sign up</button>
  }
  
return (
    <div>
            <div className="">
                <h1>CREATE ACCOUNT</h1>
            </div>
            <form onSubmit={ handleSignupSubmit }>
            <div className="">
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Username" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Password" />
                </div>
                <div>
                    { signupUIControls }
                </div>
        </div>
        </form>
        </div>
  )
}