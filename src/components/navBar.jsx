import React, { useContext } from 'react'
import AppStateContext from '../context/appStateContext'
import Appicon from '../images/appsymbol.svg'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { useTranslate } from 'react-translate'

const NavBar = () => {
  const t = useTranslate('Conticki')
  const context = useContext(AppStateContext)

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
  return (
    <Navbar bg='primary' expand='lg' className='main-navigation sticky-top'>
      <Container>
        <Navbar.Brand href='/'><img src={Appicon} alt='' style={{ height: 40 }} /></Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navigation' className='btn-light' />
        <Navbar.Collapse id='main-navigation'>
          <Nav className='mr-autotext-venter'>
            {navbarItems.map((navItem) => (
              <Nav.Link key={navItem.to} href={navItem.to} className='text-light'>

                {navItem.label}

              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
