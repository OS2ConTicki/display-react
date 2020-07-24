import React from 'react'
import { HashLink } from 'react-router-hash-link'

const NavBar = () => {
  return (
    <nav className='navbar justify-content-center navbar-expand-lg navbar-light bg-light sticky-top'>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <HashLink smooth className='navbar-brand' to='/konference#top'>
            Konference
          </HashLink>
        </li>
        <li className='nav-item'>
          <HashLink smooth className='navbar-brand' to='/konference#program'>
            Program
          </HashLink>
        </li>
        <li className='nav-item'>
          <HashLink smooth className='navbar-brand' to='/konference#speakers'>
            Talere
          </HashLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
