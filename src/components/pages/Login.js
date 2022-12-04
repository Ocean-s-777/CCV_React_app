import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function LoginView(props) {
  const UserAuthContext = React.createContext()
  const UserAuthContextValue = useContext(UserAuthContext);
  let navigate = useNavigate();
  const [loginProcessState, setLoginProcessState] = useState("idle");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoginProcessState("processing");
    try {
      const result = await axios.post(2000 + '/loginForJWT', null, {
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

    case "error":
      loginUIControls = <span style={{ color: 'red' }}>Error</span>
      break;

    default:
      loginUIControls = <button type="submit">Login</button>
  }


  return (
    <div className="login_container">
    <img src={require('../images/placeholder.png')} alt="signupimage"></img>
    <h1>SIGN IN</h1>
    <div className="login_form">
        <form action="#" method="post">
            <div className='login_user_label'>
                {/* need to insert icon */}
                <label>Username</label><br/>
                <input type="text" name="user" placeholder="Email Address" className="input-email" required />
            </div>
            <div className='login_user_password'>
                <label>Password</label><br/>
                <input type="password" name="password" id="" placeholder="Password" className="input-password" required/>
            </div>
            <a href="./">
                <p>Forgot Password?</p>
            </a>
            <button id="loginbutton" type="submit">Log In</button>
        </form>
    </div>
</div>
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={ onSubmit }>
    //     <div>
    //       Username <input type="text" name="username"/>
    //     </div>
    //     <div>
    //       Password <input type="password" name="password"/>
    //     </div>
    //     <div>
    //       { loginUIControls }
    //     </div>
    //   </form>
    // </div>
  )
}
