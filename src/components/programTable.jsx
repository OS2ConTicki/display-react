import React from 'react'
import { Link } from 'react-router-dom'
import Table from './common/table'
import Like from './common/like'

function ProgramTable ({ events, onLike }) {
  const columns = [
    {
      key: 'time',
      content: (event) => (
        <span>
          {event.from} : {event.to}
        </span>
      )
    },
    {
      label: ' ',
      key: 'like',
      content: (event) => (
        <Like liked={event.liked} onClick={() => onLike(event)} />
      )
    },

    {
      label: ' ',
      path: 'title',
      content: (event) => (
        <Link to={`/event/${event.id}`}>{event.title}</Link>
      )
    },
    { path: 'description', label: ' ' },
    { path: 'location', label: ' ' }
  ]
  return (
    <>
      {events.length > 0 && (
        <Table
          columns={columns}
          items={events}
          label={events[0].startDate}
        />
      )}
    </>
  )
}

export default ProgramTable
