import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserAuthContext } from '../../Context'
import { NavLink } from 'react-router-dom';

export default function Welcome(props) {
  const UserAuthContextValue = useContext(UserAuthContext);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(UserAuthContextValue.username);
  }, [UserAuthContextValue.username]);

  return (
    <>
      <div className="protected">
        <h1>Hello{name} and welcome to the Climate Change Visualiser</h1>
        <h3>This website was created to shed light on the effects of industrialization on the Earth. It contains information on climate change and environmental factors.</h3>
        <h3>You can continue your journey here by the graphs by clicking a link in the top bar. You can also move to view the user-specific graphs linked to this user.</h3>
      </div>
      <div className='welcome-links'>
        {
          UserAuthContextValue.jwt != null ?
            <>
              <NavLink to="/user" className='welcome-links items'> <div>Profile</div></NavLink>
              <NavLink to="/create" className='welcome-links items'> <div>Create custom view</div></NavLink>
            </>
            :
            <>
              <NavLink to="/login" className='welcome-links items'> <div>Login</div></NavLink>
              <NavLink to="/signup" className='welcome-links items'> <div>Signup</div></NavLink>
            </>
        }
      </div>
    </>
  )
}