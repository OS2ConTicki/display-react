import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import EventItem from './EventItem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getDateByLanguage, getDayByLanguage } from '../utils/dateHandler'
import AppStateContext from '../../context/appStateContext'

const EventList = ({ events, showDates }) => {
  const context = useContext(AppStateContext)
  return (
    <Container className='events'>
      <Row>
        {events.map(event => (
          <Col key={event.id} xs={12} className='mb-3'>
            {showDates && <h3 className='h4'>{getDayByLanguage(event.start_time, context.language.get)}<br /><span className='text-muted'>{getDateByLanguage(event.start_time, context.language.get)}</span></h3>}
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
