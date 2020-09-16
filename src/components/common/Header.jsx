import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Header ({ title, image }) {
  return (
    <>
      <Container className='my-5'>
        <Row className='align-items-center'>
          <Col xs={12} md={image ? 7 : 12}>
            <h1 className='mb-3 mb-md-0'>{title}</h1>
          </Col>
          {image && (
            <Col xs={12} md={5} className='text-center text-md-right'>
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
