import React, { useContext } from 'react'
import logo from './images/logo.png'
import { NavLink } from 'react-router-dom'
import createGrn from './images/createGreen.svg'
import userGrn from './images/userGreen.svg'
import logoutPic from './images/logout.png'
import { UserAuthContext } from '../Context'


export default function Header() {
  const UserAuthContextValue = useContext(UserAuthContext);

  function logout() {
    UserAuthContextValue.logout();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-head">
      <div className="container-fluid head">
        <div className="title-cont">
          <img src={logo} alt={"logo"} />
          <NavLink className="navbar-brand title" to="/">Climate Change Visualiser</NavLink>
        </div>
        <div className="icons">
          <NavLink to={"/create"}> <img src={createGrn} alt={"add"} /></NavLink>
          <NavLink to={"/user"}> <img src={userGrn} alt={"user"} /></NavLink>
          {UserAuthContextValue.jwt != null ? <NavLink onClick={() => logout()}><img id='logout' src={logoutPic} alt={"logout"} /></NavLink> : <></>}

        </div>
      </div>
    </nav>
  )
}
