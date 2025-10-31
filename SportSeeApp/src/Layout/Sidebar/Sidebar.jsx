import React from 'react'
import { NavLink } from "react-router-dom";
import Logo1 from '@/Assets/nav-logo-yoga.svg'
import Logo2 from '@/Assets/nav-logo-natation.svg'
import Logo3 from '@/Assets/nav-logo-velo.svg'
import Logo4 from '@/Assets/nav-logo-muscu.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <nav className='sidebar__nav'>
        <NavLink to="/" className='sidebard__nav--logo'>
            <img src={Logo1} alt="Yoga"/>
        </NavLink>
        <NavLink to="/" className='sidebard__nav--logo'>
          <img src={Logo2} alt="Nageur"/>
        </NavLink>
        <NavLink to="/" className='sidebard__nav--logo'>
          <img src={Logo3} alt="Cycliste"/>
        </NavLink>
        <NavLink to="/" className='sidebard__nav--logo'>
          <img src={Logo4} alt="Altère de muscu"/>
        </NavLink>
      </nav>   
      <p className='sidebar__copyright'>Copiryght, SportSee 2020</p>
    </div>
  )
}

export default Sidebar







