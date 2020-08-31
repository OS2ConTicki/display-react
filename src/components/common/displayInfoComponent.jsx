import React from 'react'
import ReactHtml from 'raw-html-react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function DisplayInfoComponent ({ title, description, image, ticket }) {
  return (
    <>
      <Row className='top scroll-offset-class'>
        <Container className='my-md-5'>
          <Row>
            <Col xs={12} md={7} className='mb-5'>
              <h1>{title}</h1>
            </Col>
            <Col xs={12} md={5} className='mb-3 text-center text-md-right'>
              {image && (
                <img
                  className='img-fluid'
                  height={image.meta.height}
                  width={image.meta.width}
                  src={image.url}
                  alt={image.meta.alt || ''}
                />
              )}
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className='py-3 bg-light'>
        <Container>
          <Row>
            <Col xs={12} className='d-flex mt-3'>
              <ReactHtml html={description} />
            </Col>
          </Row>
          {ticket && ticket.url &&
            <Row className='d-flex justify-content-center'>
              <Col xs={12} className='d-flex justify-content-center mt-3'>
                <p className='text-center'>
                  <a className='btn btn-primary btn-lg px-md-5' href={ticket.url}>{ticket.text || 'Billeter kan købes her'} </a>
                </p>
              </Col>
            </Row>}
        </Container>
      </Row>
    </>
  )
}

export default DisplayInfoComponent
