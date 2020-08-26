import React, { useContext } from 'react'
import AppStateContext from '../context/appStateContext'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { useTranslate } from 'react-translate'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const t = useTranslate('Conticki')
  const context = useContext(AppStateContext)
  const conference = context.conference.get

  const navbarItems = [
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

  // We prefer to use an SVG.
  const icon = conference.app?.logo_svg || conference.app?.icons?.['128x128']

  return (
    <Navbar variant='dark' bg='primary' expand='lg' sticky='top' className='main-navigation'>
      <Container>
        <Navbar.Brand>
          <Link to='/#home' className='nav-brand mr-md-3'>
            {icon ? <img src={icon} alt={conference.title} style={{ height: 40 }} /> : <span className='text-light'>{conference.title}</span>}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navigation' />
        <Navbar.Collapse id='main-navigation'>
          <Nav className='mr-autotext-venter'>
            {navbarItems.map((navItem) => (
              <Link key={navItem.to} to={navItem.to} className='nav-link'>{navItem.label}</Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
