import React from 'react'
import logo from './images/logo.png'
import userSvg from './images/user.svg'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid head">
    <img src={logo} alt={"logo"} href="/"/>
    <a className="navbar-brand title" href="/">Climate Change Visualiser</a>
    <img src={userSvg} alt={"user image"} href="/User"/>
  </div>
</nav>
  )
}
