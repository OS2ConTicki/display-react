import React, { useContext } from 'react'
import AppStateContext from '../context/appStateContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'


function Footer () {
  const context = useContext(AppStateContext)

  return (
    <Row className='bg-secondary'>
      <Container>
        <Row className='my-3'>
          <Col md={6}>
            <p className='text-light mt-2'>OS2Contiki - Conference and ticket management</p>
          </Col>
          <Col md={6}>
            <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link className='disabled text-light'>Vælg sprog:</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='text-light' onClick={() => context.language.set('da')}>Dansk</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='text-light' onClick={() => context.language.set('en')}>English</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Row>
  )
}

export default Footer
