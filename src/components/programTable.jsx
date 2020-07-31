import React from 'react'
import { Link } from 'react-router-dom'
import Table from './common/table'
import Like from './common/like'

function ProgramTable ({ events, onLike }) {
  const columns = [
    {
      label: ' ',
      path: 'title',
      key: 'title',
      content: (event) => (

        <h3 className='card-header'>
          <Link to={`/event/${event.id}`}>
            {event.title}
          </Link>
        </h3>

      )
    },
    {
      label: ' ',
      key: 'like',
      content: (event) => (
        <div className='col-4'>
          <Like liked={event.liked} onClick={() => onLike(event)} />
        </div>
      )
    },
    {
      key: 'time',
      content: (event) => (
        <div className='col-6'>
          {event.from} : {event.to}
        </div>
      )
    },
    {
      path: 'location',
      label: ' ',
      content: (event) => (
        <div className='col-6'>
          {event.location}
        </div>
      )
    },
    {
      path: 'summary',
      label: ' ',
      content: (event) => (
        <div className='col-12'>
          {event.summary}
        </div>
      )
    }
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
