import React from 'react'
import { NavLink } from 'react-router-dom'
import CO2 from './images/CO2.jpg'
import EmissionSources from './images/EmissionSources.png'


export default function PageSelect() {
  return (
    //my implementation
    // <nav>
    //   <div className='navbar container-fluid'>
    //     <NavLink className={'plink'} to="/CO2">
    //       <div className='linkText'>Atmospheric CO2 and Temperatures</div>
    //       {/* <img src={CO2} alt="" /> */}
    //     </NavLink>
    //     <NavLink className={'plink'} to="/Sources">
    //       <div className='linkText'>Emission Sources</div>
    //       {/* <img src={EmissionSources} alt="" /> */}
    //     </NavLink>
    //   </div>
    // </nav> 
     //bootstrap implementation
  
   <nav className="navbar navbar-expand-lg nav-light">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 page-nav">
          <li className="nav-item">
          <NavLink className={'plink'} to="/CO2">
           <div className='linkText'>Atmospheric CO2 and Temperatures</div>
          </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className={'plink'} to="/sources">
           <div className='linkText'>Emission Sources</div>
         </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
