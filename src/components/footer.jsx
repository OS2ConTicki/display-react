import React, { useContext } from 'react'
import AppStateContext from '../context/appStateContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { useTranslate } from 'react-translate'

function Footer () {
  const t = useTranslate('Conticki')
  const context = useContext(AppStateContext)
  const conference = context.conference.get

  return (
    <Container fluid className='bg-secondary'>
      <Row>
        <Col>
          <Container>
            <Row xs={1} md={3} className='my-3'>
              <Col>
                <p className='text-light mt-2'>{t('OS2Contiki - Conference and ticket management')}</p>
              </Col>
              {conference.app.accessibility_statement?.url &&
                <Col className='text-md-center'>
                  <p className='mt-2'><a className='text-light' href={conference.app.accessibility_statement.url}>{conference.app.accessibility_statement.text || t('Accessibility statement')}</a></p>
                </Col>}
              <Col>
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
