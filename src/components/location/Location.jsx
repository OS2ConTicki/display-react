import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'
import { useTranslate } from 'react-translate'
import EventList from '../event/EventList'

const Location = ({ location }) => {
  const t = useTranslate('Conticki')
  // Unwrap the location object.
  const { title, image, description } = location

  return (
    <div className='location'>
      <Row className='top scroll-offset-class'>
        <Container className='my-md-5'>
          <Row>
            <Col xs={12} md={image ? 7 : 12} className='my-5'>
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
      {location.events &&
        <Row className='py-3'>
          <Container>
            <Row>
              <Col xs={12} className='d-flex mt-3'>
                <h2 className='h4'>{t('Location for')}</h2>
              </Col>
            </Row>
          </Container>
          <Col xs={12} className='d-flex mt-3'>
            <EventList events={location.events} />
          </Col>
        </Row>}
    </div>
  )
}

Location.propTypes = {
  location: PropTypes.object
}

export default Location
