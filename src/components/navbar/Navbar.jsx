import React from 'react'
import './nav.css'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate=useNavigate()
  return (
    <>
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
  <div class="container-fluid">
    <a class="navbar-brand text-black" href="#">

    </a>
    <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
      <div class="navbar-nav mx-auto">
        <a class="nav-link active text-black " aria-current="page" href="#" onClick={()=>navigate('bill')}>BILL</a>
      </div>
    </div>
  </div>
</nav>
    </div>
    </>
  )
}

export default Navbar