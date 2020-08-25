import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'
import EventList from '../event/EventList'
import { useTranslate } from 'react-translate'

const Organizer = ({ organizer }) => {
  const t = useTranslate('Conticki')
  // Unwrap the organizer object.
  const { title, image, description } = organizer

  return (
    <div className='organizer'>
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
        </Container>
      </Row>
      {organizer.events &&
        <Row className='py-3'>
          <Container>
            <Row>
              <Col xs={12} className='d-flex mt-3'>
                <h2 className='h4'>{t('Organizer for')}</h2>
              </Col>
            </Row>
          </Container>
          <Col xs={12} className='d-flex mt-3'>
            <EventList events={organizer.events} />
          </Col>
        </Row>}
    </div>
  )
}

Organizer.propTypes = {
  organizer: PropTypes.object
}

export default Organizer
