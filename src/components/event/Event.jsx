import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'

const Event = ({ event, onLike }) => {
  // Unwrap the event object.
  const { title, image, description, ticketUrl } = event

  return (
    <div className='event'>
      <Row className='top scroll-offset-class'>
        <Container className='my-md-5'>
          <Row>
            <Col xs={12} md={7} className='my-5'>
              <h1>{title}</h1>
            </Col>
            <Col xs={12} md={5} className='mb-3'>
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
          {ticketUrl && ticketUrl.url &&
            <Row className='d-flex justify-content-center'>
              <Col xs={12} className='d-flex justify-content-center mt-3'>
                <p className='text-center'>
                  <a
                    className='btn btn-primary btn-lg px-md-5'
                    href={ticketUrl.url}
                  >{ticketUrl.text || 'Billeter kan købes her'}
                  </a>
                </p>
              </Col>
            </Row>}
        </Container>
      </Row>

      <pre>{JSON.stringify(event, null, 2)}</pre>
    </div>
  )
}

Event.propTypes = {
  onLike: PropTypes.func,
  event: PropTypes.object
}

export default Event
