import React from 'react'

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
          <a className="nav-link active plink" aria-current="page" href="/CO2">Atmospheric CO2 and Temperatures</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active plink" href="/Sources">Emission Sources</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
