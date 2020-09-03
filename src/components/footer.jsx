import React, { useContext } from 'react'
import AppStateContext from '../context/appStateContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { useTranslate } from 'react-translate'
import { Link } from 'react-router-dom'

function Footer () {
  const t = useTranslate('Conticki')
  const context = useContext(AppStateContext)
  const conference = context.conference.get

  return (
    <Container fluid className='bg-secondary'>
      <Row>
        <Col>
          <Container>
            <Row className='my-3'>
              <Col md={4}>
                <p className='text-light mt-2'>{t('OS2Contiki - Conference and ticket management')}</p>
              </Col>
              <Col md={4}>
                {conference.app.accessibility_statement.url &&
                  <p className='text-light mt-2'><Link to={conference.app.accessibility_statement.url}>{conference.app.accessibility_statement.text}</Link></p>}
              </Col>
              <Col md={4}>
                <Nav variant='pills' defaultActiveKey='/home'>
                  <Nav.Item>
                    <Nav.Link className='disabled text-light'>{t('Select language')}:</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className='text-light' onClick={() => context.language.set('da')}>{t('Dansk')}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className='text-light' onClick={() => context.language.set('en')}>{t('English')}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
