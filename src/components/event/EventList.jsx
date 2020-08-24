import React from 'react'
import PropTypes from 'prop-types'
import EventItem from './EventItem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const EventList = ({ events }) => {
  return (
    <Container className='events'>
      <Row>
        {events.map(event => (
          <Col key={event.id} xs={12} className='mb-3'>
            <EventItem event={event} />
          </Col>
        )
        )}
      </Row>
    </Container>
  )
}

EventList.propTypes = {
  onLike: PropTypes.func,
  events: PropTypes.array.isRequired
}

export default EventList
