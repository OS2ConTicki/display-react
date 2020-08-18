import React, { useContext } from 'react'
import { HashLink } from 'react-router-hash-link'
import AppStateContext from '../context/appStateContext'
import Appicon from '../images/appsymbol.svg'

const NavBar = () => {
  const context = useContext(AppStateContext)

  const navbarItems = [
    {
      to: '/#top',
      label: 'Home'
    },
    {
      to: '/#program',
      label: 'Program'
    }

  ]

  if (context.speakers.get && context.speakers.get.length > 0) {
    navbarItems.push({
      to: `/${context.speakers.get[0].type}`,
      label: 'Talere'
    })
  }
  if (context.organizers.get && context.organizers.get.length > 0) {
    navbarItems.push({
      to: `/${context.organizers.get[0].type}`,
      label: 'Arrangører'
    })
  }
  if (context.sponsors.get && context.sponsors.get.length > 0) {
    navbarItems.push({
      to: `/${context.sponsors.get[0].type}`,
      label: 'Sponsorer'
    })
  }
  return (
    <nav className='main-navigation sticky-top' role='navigation'>
      <ul className='nav justify-content-center '>
        <li><img src={Appicon} alt='' style={{ height: 40 }} className='nav-link' /></li>
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
