import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function LoginView(props) {
  const UserAuthContext = React.createContext()
  const UserAuthContextValue = useContext(UserAuthContext);
  let navigate = useNavigate();
  const [ loginProcessState, setLoginProcessState ] = useState("idle");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoginProcessState("processing");
    try {
      const result = await axios.post(Constants.API_ADDRESS + '/loginForJWT', null, {
        auth: {
          username: event.target.username.value,
          password: event.target.password.value
        }
      })
      console.log(result);
      console.log(result.data);
      setLoginProcessState("success");
      setTimeout(() => {
        setLoginProcessState("idle")
        UserAuthContextValue.login(result.data.token);
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error.message);
      setLoginProcessState("error");
      setTimeout(() => setLoginProcessState("idle"), 1500);
    }
  }

  let loginUIControls = null;
  switch(loginProcessState) {
    case "idle":
      loginUIControls = <button type="submit">Login</button>
      break;

    case "processing":
      loginUIControls = <span style={{color: 'blue'}}>Processing login...</span>
      break;

    case "success":
      loginUIControls = <span style={{color: 'green'}}>Login successful</span>
      break;

    case "error":
      loginUIControls = <span style={{color: 'red'}}>Error</span>
      break;

    default:
      loginUIControls = <button type="submit">Login</button>
  }


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ onSubmit }>
        <div>
          Username <input type="text" name="username"/>
        </div>
        <div>
          Password <input type="password" name="password"/>
        </div>
        <div>
          { loginUIControls }
        </div>
      </form>
    </div>
  )
}
