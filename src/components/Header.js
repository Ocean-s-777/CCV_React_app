import React from 'react'
import logo from './images/logo.png'
import createGrn from './images/createGreen.svg'
import userGrn from './images/userGreen.svg'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-head">
  <div className="container-fluid head">
    <div className="title-cont">
      <img src={logo} alt={"logo"} href="/"/>
      <a className="navbar-brand title" href="/">Climate Change Visualiser</a></div>
    <div className="icons">
      <img src={createGrn} alt={"add image"} href="/User"/>
      <img src={userGrn} alt={"user image"} href="/User"/></div>
  </div>
</nav>
  )
}
