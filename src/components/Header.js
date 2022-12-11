import React from 'react'
import logo from './images/logo.png'
import { Link } from 'react-router-dom'
import createGrn from './images/createGreen.svg'
import userGrn from './images/userGreen.svg'
import LoginView from './pages/Login'
import signupView from './pages/Signup'
import PageSelect from './PageSelect'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-head">
      <div className="container-fluid head">
        <div className="title-cont">
          <img src={logo} alt={"logo"} href="/" />
          <a className="navbar-brand title" href="/">Climate Change Visualiser</a></div>
        <div className="icons">
          <a href="/create"><img src={createGrn} alt={"add"}/></a>
          <a href="/user"><img src={userGrn} alt={"user"}/></a>
          {/* <img src={createGrn} alt={"add"} href="/Login"/>
      <img src={userGrn} alt={"user"} href="/User"/> */}
        </div>
      </div>
    </nav>
  )
}
