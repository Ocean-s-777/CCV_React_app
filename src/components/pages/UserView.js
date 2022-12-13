import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAuthContext } from '../../Context';
import { fetchURL } from '../visualizations/modules/fetchURL';
require("../images/placeholder.png")


export default function UserView(props) {
  const navigate = useNavigate();
  const UserAuthContextValue = useContext(UserAuthContext);
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [cViews, setCViews] = useState([]);


  useEffect(() => {
    setName(UserAuthContextValue.username);
  }, [UserAuthContextValue.username]);

  async function removeAcc() {
    const choice = window.confirm("Are you sure you want to delete your account?")
    if (choice) {
      const config = {
        headers: {
          Authorization: `Bearer ${UserAuthContextValue.jwt}`
        }
      }

      try {
        console.log(UserAuthContextValue.jwt);
        const results = await axios.delete(`${fetchURL}/user/delete`, config);
        if (results.status === 200) {
          UserAuthContextValue.logout();
          setShowAlert(false);
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    }

  }

  return (
    <div className="login_container user_container">
      <img src={require('../images/placeholder.png')} alt="forestimage"></img>
      <div className="loginBox loginRight">
        <div>
          <h1>Profile view</h1>
          <div className='acc-actions'>
            <h2 className="user-title username">{name}</h2>
            <button className='acc-buttons' onClick={() => { UserAuthContextValue.logout(); navigate("/", { replace: true }) }} >Logout</button>
            <button className="acc-buttons remove-acc" onClick={() => removeAcc()}>Remove account</button>
          </div>
          <h2 className="user-title">Custom views</h2>
          <div className="custom-views">
            {/* oskari please input code here for custom view removal/adding */}
          </div>
        </div>
      </div>
    </div>
  )
}
