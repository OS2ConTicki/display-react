import React, { useContext } from 'react'
import { HashLink } from 'react-router-hash-link'
import AppStateContext from '../context/appStateContext'
const NavBar = () => {
  const context = useContext(AppStateContext)

  const navbarItems = [
    {
      to: '/konference#top',
      label: 'Konference'
    },
    {
      to: '/konference#program',
      label: 'Program'
    }

  ]

  if (context.speakers.get && context.speakers.get.length > 0) {
    navbarItems.push({
      to: `/konference#${context.speakers.get[0].type}`,
      label: 'Talere'
    })
  }
  if (context.organizers.get && context.organizers.get.length > 0) {
    navbarItems.push({
      to: `/konference#${context.organizers.get[0].type}`,
      label: 'Arrangører'
    })
  }
  if (context.sponsors.get && context.sponsors.get.length > 0) {
    navbarItems.push({
      to: `/konference#${context.sponsors.get[0].type}`,
      label: 'Sponsorer'
    })
  }
  return (
    <nav className='navbar justify-content-center navbar-expand-lg navbar-light bg-light sticky-top'>
      <ul className='navbar-nav'>
        {navbarItems.map((navItem) => (
          <li className='nav-item' key={navItem.to}>
            <HashLink smooth className='navbar-brand' to={navItem.to}>
              {navItem.label}
            </HashLink>

          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
