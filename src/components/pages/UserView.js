import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAuthContext } from '../../Context';
import { fetchURL } from '../visualizations/modules/fetchURL';
import MapUserViews from './modules/MapUserViews';
require("../images/placeholder.png")


export default function UserView(props) {
  const navigate = useNavigate();
  const UserAuthContextValue = useContext(UserAuthContext);
  const [name, setName] = useState("");

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
        const results = await axios.delete(`${fetchURL}/user/delete`, config);
        if (results.status === 200) {
          UserAuthContextValue.logout();
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
        <div className='profile'>
          <h1>Profile view</h1>
          <div className='acc-actions'>
            <h2 className="user-title username">{name}</h2>
            <button className='acc-buttons' onClick={() => { UserAuthContextValue.logout(); navigate("/", { replace: true }) }} >Logout</button>
            <button className="acc-buttons remove-acc" onClick={() => removeAcc()}>Remove account</button>
          </div>
          <h2 className="user-title">Custom views</h2>
          <div className="custom-views">
            <MapUserViews />
          </div>
        </div>
      </div>
    </div>
  )
}
