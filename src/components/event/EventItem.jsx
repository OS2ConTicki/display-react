import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Like from '../common/like'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { getTime } from '../utils/dateHandler'
import AppStateContext from '../../context/appStateContext'

function Event ({ event, onLike }) {
  const classes = event.isEventDone ? 'bg-light' : 'bg-info'
  const context = useContext(AppStateContext)
  const { themes } = event
  return (
    <Card className={classes}>
      <Card.Body>
        <Row>
          <Col xs={8}>
            <Link to={`/event/${event.id}`}>
              <h3>{event.title}</h3>
            </Link>
          </Col>
          <Col xs={4} className='text-right'>
            <Like liked={event.liked} onClick={() => onLike(event)} />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <strong>
              {getTime(event.start_time, context.language.get)} :{' '}
              {getTime(event.end_time, context.language.get)}
            </strong>
          </Col>
          <Col xs={4}>
            <strong>{themes.map(theme => (
              <span key={theme.id}>{theme.title}</span>
            )
            )}
            </strong>
          </Col>
          <Col xs={4}>
            <Link to={`location/${event.location.id}`}>
              <strong>{event.location.title}</strong>
            </Link>
          </Col>
          <Col xs={12}>{event.summary}</Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Event
