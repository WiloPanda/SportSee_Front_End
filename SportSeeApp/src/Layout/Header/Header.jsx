import React from 'react'
import Logo from '@/Assets/SportSee_Logo.svg'
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
        <div className='header__brand'>
            <img className="header__brand--logo" src={Logo} alt="SportSee Logo" />
            <p className="header__brand--title">SportSee</p>  
        </div>   
        <nav className="header__nav">
          <NavLink to="/" className="header__nav--link">
            Accueil
          </NavLink>
          <NavLink to="/userprofile" className="header__nav--link">
            Profil
          </NavLink>
          <NavLink to="/" className="header__nav--link">
            Réglage
          </NavLink>
          <NavLink to="/" className="header__nav--link">
            Communauté
          </NavLink>
        </nav>
    </header>
  )
}

export default Header
