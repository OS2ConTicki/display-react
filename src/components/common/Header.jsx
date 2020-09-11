import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Header ({ title, image }) {
  return (
    <>
      <Container className='my-md-5'>
        <Row>
          <Col xs={12} md={image ? 7 : 12} className='mb-5'>
            <h1>{title}</h1>
          </Col>
          {image && (
            <Col xs={12} md={5} className='mb-3 text-center text-md-right'>
              <img
                className='img-fluid'
                height={image.meta.height}
                width={image.meta.width}
                src={image.url}
                alt={image.meta.alt || ''}
              />
            </Col>
          )}
        </Row>
      </Container>
    </>
  )
}

export default Header
