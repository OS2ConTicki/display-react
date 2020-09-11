import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'
import EventList from '../event/EventList'
import { useTranslate } from 'react-translate'
import Header from '../common/Header'

const Speaker = ({ speaker }) => {
  const t = useTranslate('Conticki')
  // Unwrap the speaker object.
  const { title, image, description } = speaker

  return (
    <div className='speaker'>
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
      {speaker.events &&
        <Row className='py-3'>
          <Container>
            <Row>
              <Col xs={12} className='d-flex mt-3'>
                <h2 className='h4'>{t('Speaker at')}</h2>
              </Col>
            </Row>
          </Container>
          <Col xs={12} className='d-flex mt-3'>
            <EventList events={speaker.events} showDates />
          </Col>
        </Row>}
    </div>
  )
}

Speaker.propTypes = {
  speaker: PropTypes.object
}

export default Speaker
