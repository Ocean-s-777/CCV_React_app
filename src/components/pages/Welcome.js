import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserAuthContext } from '../../Context'
import axios from 'axios';

export default function GetName(props) {
  const UserAuthContextValue = useContext(UserAuthContext);
  const [name, setName] = useState("");

  const loadData = async () => {
    try {
      const results = await axios.get(2000 + '/nameJWT', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + UserAuthContextValue.jwt
          }
      });

      setName(results.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="protected">
        
        <div>current site is Home (/welcome)</div>
        <h2> Hello{name}!</h2> {/* this should only show if user logged in  */}
        <h3>This website was created to shed light on the effects of industrialization on the Earth. It contains information on climate change and environmental factors.</h3>
        <h3>You can continue your journey here by viewing our <a href="?">'about us'-page</a> or moving onto the graphs by clicking a link in the top bar. You can also move to view the user-specific graphs linked to this user.</h3>
        
        <Link to='/'>Go back to home</Link><br />
        <button onClick={() => UserAuthContextValue.logout()} >Logout</button>
    </div>
  )
}

//#479042
//#003798