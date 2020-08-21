import React, { useContext } from 'react'
import { HashLink } from 'react-router-hash-link'
import AppStateContext from '../context/appStateContext'
import Appicon from '../images/appsymbol.svg'
import { useTranslate } from 'react-translate'

const NavBar = () => {
  const t = useTranslate('Conticki')
  const context = useContext(AppStateContext)

  const navbarItems = [
    {
      to: '/#top',
      label: t('Home')
    },
    {
      to: '/#program',
      label: t('Program')
    }
  ]

  if (context.speakers.get && context.speakers.get.length > 0) {
    navbarItems.push({
      to: `/${context.speakers.get[0].type}`,
      // Force pluralization
      label: t('Speakers', { n: 87 })
    })
  }
  if (context.organizers.get && context.organizers.get.length > 0) {
    navbarItems.push({
      to: `/${context.organizers.get[0].type}`,
      // Force pluralization
      label: t('Organizers', { n: 87 })
    })
  }
  if (context.sponsors.get && context.sponsors.get.length > 0) {
    navbarItems.push({
      to: `/${context.sponsors.get[0].type}`,
      // Force pluralization
      label: t('Sponsors', { n: 87 })
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
