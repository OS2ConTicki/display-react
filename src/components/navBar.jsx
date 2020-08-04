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
    <nav className='main-navigation sticky-top' role='navigation'>
      <ul className='nav justify-content-center '>
        {navbarItems.map((navItem) => (
          <li className='nav-item' key={navItem.to}>
            <HashLink smooth to={navItem.to} className='nav-link text-light'>
              {navItem.label}
            </HashLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
