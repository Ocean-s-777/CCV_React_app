import React from 'react'
import { NavLink } from 'react-router-dom'


export default function PageSelect() {
  return (
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
