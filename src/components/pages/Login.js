import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchURL } from '../visualizations/modules/fetchURL';
import { UserAuthContext } from '../../Context';




export default function LoginView() {
  const UserAuthContextValue = useContext(UserAuthContext);
  let navigate = useNavigate();
  const [loginProcessState, setLoginProcessState] = useState("idle");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoginProcessState("processing");
    try {
      const result = await axios.post(fetchURL + '/user/login', {
        username: event.target.username.value,
        password: event.target.password.value
      })
      setLoginProcessState("success");
      setTimeout(() => {
        setLoginProcessState("idle")
        UserAuthContextValue.username = " " + result.data.username
        UserAuthContextValue.login(result.data.token);
        console.log(UserAuthContextValue);
        navigate("/user", { replace: true });
      }, 1500);
    } catch (error) {
      console.log(error.response);
      if (error.response.status !== 200) {
        setLoginProcessState("Unauthorized");
        setTimeout(() => setLoginProcessState("idle"), 1500);
      }
    }
  }

  let loginUIControls = null;
  switch (loginProcessState) {
    case "idle":
      loginUIControls = <button type="submit">Login</button>
      break;

    case "processing":
      loginUIControls = <span style={{ color: 'blue' }}>Processing login...</span>
      break;

    case "success":
      loginUIControls = <span style={{ color: 'green' }}>Login successful</span>
      break;

    case "Unauthorized":
      loginUIControls = <span style={{ color: 'red' }}>Inncorrect username or password</span>
      break;

    default:
      loginUIControls = <button type="submit">Login</button>
  }


  return (
    <div className="login_container">
      <img src={require('../images/placeholder.png')} alt="signupimage"></img>
      <div className="loginBox loginRight">
        <div>
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label>Username</label><br />
              <input type="text" name="username" /><br />
            </div>
            <div>
              <label>Password</label><br />
              <input type="password" name="password" />
            </div>
            <div className="loginCtrl">
              {loginUIControls}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}