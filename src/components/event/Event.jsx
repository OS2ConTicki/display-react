import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'
import { format } from 'date-fns'

const Event = ({ event, onLike }) => {
  // Unwrap the event object.
  const { title, image, description, ticketUrl } = event

  return (
    <div className='event'>
      <Row className='top scroll-offset-class'>
        <Container className='my-md-5'>
          <Row>
            <Col xs={12} md={image ? 7 : 12} className='my-5'>
              <h1>{title}</h1>
            </Col>
            {image && (
              <Col xs={12} md={5} className='mb-3'>
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
      </Row>
      <Row className='py-3 bg-light'>
        <Container>
          <Row>
            {/* TODO: Fix timezone */}
            <Col><p className='lead mb-0'>{format(new Date(event.start_time), 'eeee kk:mm')} to {format(new Date(event.end_time), 'kk:mm')}</p></Col>
            {ticketUrl && ticketUrl.url &&
              <Col className='mt-3 text-right'>
                <a
                  className='btn btn-primary btn-lg px-md-5'
                  href={ticketUrl.url}
                >{ticketUrl.text || 'Billeter kan købes her'}
                </a>
              </Col>}
          </Row>
        </Container>
      </Row>
      <Row className='py-3'>
        <Container>
          <Row>
            <Col xs={12} className='d-flex mt-3'>
              <ReactHtml html={description} />
            </Col>
          </Row>

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
