import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//#479042
//#003798
export default class Home extends Component {
  render() {
    return (
      <>
      <div>current site is Home (/)</div>
      <h2> Hello [get username]!</h2> {/* this should only show if user logged in  */}
      <h3>This website was created as a school project to showcase our skills. It contains information on climate change and enviromental factors, acting like a spotlight shedding light on the effects of industrialization on nature.</h3>
      <h3>You can continue your journey here by viewing our <a href="?">'about us'-page</a> or moving onto the graphs by clicking a link in the top bar. You can also move to view the user-specific graphs linked to this user.</h3>
      </>
    )
  }
}
