import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'
import EventList from '../event/EventList'
import { useTranslate } from 'react-translate'
import Header from '../common/Header'

const Organizer = ({ organizer }) => {
  const t = useTranslate('Conticki')
  // Unwrap the organizer object.
  const { title, image, description } = organizer

  return (
    <div className='organizer'>
      <Row className='top scroll-offset-class'>
        <Header title={title} image={image} />
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
      {organizer.website_url &&
        <Row className='py-3 bg-light'>
          <Container>
            <Row>
              <Col xs={12} className='d-flex mt-3'>
                <a href={organizer.website_url} className='btn btn-primary btn-lg'>
                  {t('Read more on webpage for {{organizer}}', { organizer: organizer.title })}
                </a>
              </Col>
            </Row>
          </Container>
        </Row>}
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
