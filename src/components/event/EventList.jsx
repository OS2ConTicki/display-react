import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const EventList = ({ events, onLike }) => (
  <div className='events'>
    {events.map(event => (
      <div key={event.id} className='event'>
        <div className='title'>
          <Link to={`/event/${event.id}`}>
            {event.title}
          </Link>
        </div>
        {JSON.stringify(event)}
      </div>)
    )}
  </div>
)

EventList.propTypes = {
  onLike: PropTypes.func,
  events: PropTypes.array.isRequired
}

export default EventList
