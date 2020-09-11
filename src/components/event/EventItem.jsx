import React from 'react'
import { Link } from 'react-router-dom'
import Like from '../common/like'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { formatTime } from '../utils/dateHandler'
import { useTranslate } from 'react-translate'

function Event ({ event, onLike }) {
  const classes = event.isEventDone ? 'bg-light' : 'bg-info'
  const { themes } = event
  const t = useTranslate('Conticki')

  return (
    <Card className={classes}>
      <Card.Body>
        <Row>
          <Col xs={8}>
            <Link to={`/event/${event.id}`}>
              <h3>{event.title}</h3>
            </Link>
          </Col>
          {onLike &&
            <Col xs={4} className='text-right'>
              <Like liked={event.liked} onClick={() => onLike(event)} />
            </Col>}
        </Row>
        <Row>
          <Col xs={4}>
            <strong>
              {t('{{start_time}}–{{end_time}}', { start_time: formatTime(event.start_time), end_time: formatTime(event.end_time) })}
            </strong>
          </Col>
          <Col xs={4}>
            <strong>{themes.map(theme => (
              <Link key={theme.id} to={`/theme/${theme.id}`}>{theme.title}</Link>
            )
            )}
            </strong>
          </Col>
          <Col xs={4}>
            {event.location &&
              <Link to={`/location/${event.location.id}`}>
                <strong>{event.location.title}</strong>
              </Link>}
          </Col>
          <Col xs={12}>{event.summary}</Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Event
