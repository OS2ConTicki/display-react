import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'
import OrganizerList from '../organizer/OrganizerList'
import SpeakerList from '../speaker/SpeakerList'
import SponsorList from '../sponsor/SponsorList'
import { Link } from 'react-router-dom'
import { useTranslate } from 'react-translate'
import Header from '../common/Header'
import { formatDate, formatTime } from '../utils/dateHandler.jsx'

const Event = ({ event, onLike }) => {
  const t = useTranslate('Conticki')
  // Unwrap the event object.
  const { title, image, description, ticket, themes, location } = event

  return (
    <div className='event'>
      <Row className='top scroll-offset-class'>
        <Header title={title} image={image} />
      </Row>
      <Row className='py-3 bg-light'>
        <Container>
          <Row xs={1} md={2}>
            <Col><p className='lead mb-0'><strong className='mr-3'>{t('Date')}</strong>{formatDate(event.start_time, 'PPPP')}</p></Col>
            <Col><p className='lead mb-0'><strong className='mr-3'>{t('Time')}</strong>{t('{{start_time}} to {{end_time}}', { start_time: formatTime(event.start_time), end_time: formatTime(event.end_time) })}</p></Col>
            <Col><p className='lead mb-0'><strong className='mr-3'>{t('Where')}</strong><Link to={`/location/${location.id}`}>{location.title}</Link></p></Col>
            <Col>
              {themes && themes.length > 0 &&
                <p className='lead mb-0'>
                  <strong className='mr-3'>{t('Themes', { n: themes.length })}</strong>
                  {themes.map(theme => <Link key={theme.id} to={`/theme/${theme.id}`}>{theme.title}</Link>)}
                </p>}
            </Col>
          </Row>
          {ticket && ticket.url &&
            <Row>
              <Col className='mt-3 py-3 text-center'>
                <a
                  className='btn btn-primary btn-lg px-md-5'
                  href={ticket.url}
                >{ticket.text || t('Buy ticket')}
                </a>
              </Col>
            </Row>}
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
      {event.speakers.length > 0 &&
        <Row className='py-3'>
          <Container>
            <Row>
              <SpeakerList speakers={event.speakers} />
            </Row>
          </Container>
        </Row>}
      {event.organizers.length > 0 &&
        <Row className='py-3'>
          <Container>
            <Row>
              <OrganizerList organizers={event.organizers} />
            </Row>
          </Container>
        </Row>}
      {event.sponsors.length > 0 &&
        <Row className='py-3'>
          <Container>
            <Row>
              <SponsorList sponsors={event.sponsors} />
            </Row>
          </Container>
        </Row>}
    </div>
  )
}

Event.propTypes = {
  onLike: PropTypes.func,
  event: PropTypes.object
}

export default Event
