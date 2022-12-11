import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



import { UserAuthContext } from '../../Context';


export default function UserView(props) {
    const UserAuthContextValue = useContext(UserAuthContext);
    const [name, setName] = useState("");
    const [cViews, setCViews] = useState([]);
  
    const loadData = async () => {
      try {

        const nResults = await axios.get(2000 + '/nameJWT', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + UserAuthContextValue.jwt
            }
        });

        const cVResults = await axios.get(2000 + '/customviewsJWT', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + UserAuthContextValue.jwt
              }
          });
  
        setName(nResults.data);
        setCViews(cVResults.data);
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <div className="user_container">
    <img src={require('../images/placeholder.png')} alt="forestimage"></img>
    <div className="loginBox loginRight">
       <div>
           <div>current site is protected User (/user)</div>
       <h1>Profile view</h1>
       
          <h2 className="user-title username">{name}</h2> {/* this should only show if user logged in  */}
          <button onClick={() => UserAuthContextValue.logout()} >Logout</button>
          <h2 className="user-title">Custom views</h2>
          <div className="custom-views">
              {/* oskari please input code here for custom view removal/adding */}
          </div>
          {/*<button onClick={() => functionToRemoveAccount() } className="remove-acc">Remove account</button> */}
      </div>
    </div>
    </div>
  )
}
