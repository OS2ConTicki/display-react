import React, { useEffect, useState, useContext } from 'react'
import DisplayInfoComponent from './common/displayInfoComponent'
import AppStateContext from '../context/appStateContext'
import _ from 'lodash'

function Event (props) {
  const context = useContext(AppStateContext)
  const [event, setEvent] = useState()
  useEffect(() => {
    const eventId = props.match.params.id
    const events = context.events.get
    if (events) {
      const eventToSave = _.find(events, function (event) {
        return event.id === eventId
      })
      setEvent(eventToSave)
    }
  })
  return (
    <>
      {event && (
        <DisplayInfoComponent
          title={event.title}
          description={event.description}
          image={event.image}
          ticketUrl={event.ticketUrl}
        />
      )}
    </>
  )
}

export default Event
