import React, { Component, useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchURL } from '../visualizations/modules/fetchURL';
import { UserAuthContext } from '../../Context';
//import VisualizationV1 from '../visualizations/VisualizationV1'
//#479042
//#003798

export default function SignupView() {
  const UserAuthContextValue = useContext(UserAuthContext);
  let navigate = useNavigate();
  const [signupProcessState, setSignupProcessState] = useState("idle");

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setSignupProcessState("processing");
    try {
      const result = await axios.post(fetchURL + '/user/register', {
        username: event.target.username.value,
        password: event.target.password.value
      })
      console.log(result);
      setSignupProcessState("success");
      setTimeout(() => {
        setSignupProcessState("idle")
        UserAuthContextValue.login(result.data.token);
        navigate("/user", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);
      if (error.response.status !== 200) {
        if (error.response.data.message === "Username exists") {
          setSignupProcessState("Username exists");
          setTimeout(() => setSignupProcessState("idle"), 1500);
        }
        else {
          setSignupProcessState("short password");
          setTimeout(() => setSignupProcessState("idle"), 1500);
        }
      }
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

    case "Username exists":
      signupUIControls = <span style={{ color: 'red' }}>Username exists</span>
      break;

    case "short password":
      signupUIControls = <span style={{ color: 'red' }}>Password must be at least 8 characters long</span>
      break;

    default:
      signupUIControls = <button type="submit">Add Account</button>
  }

  return (
    <div className="login_container">
      <img src={require('../images/placeholder.png')} alt="signupimage"></img>
      <div className="loginBox loginRight">
        <div>
          <h1>Sign up</h1>
          <form onSubmit={handleSignupSubmit}>
            <div>
              <label>Username</label><br />
              <input type="text" name="username" /><br />
            </div>
            <div>
              <label>Password</label><br />
              <input type="password" name="password" />
            </div>
            <div className="loginCtrl">
              {signupUIControls}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}