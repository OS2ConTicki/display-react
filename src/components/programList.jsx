import React from 'react'
import { Link } from 'react-router-dom'
import Like from './common/like'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

function ProgramList ({ events, onLike, date, day }) {
  return (
    <>
      {events.length > 0 && (
        <Row>
          <h3>{day}{date}</h3>
          {events.map((item) => (
            <Card
              key={item.id}
            >
              <Card.Body>
                <Link to={`/event/${item.id}`}>
                  {item.title}
                </Link>
                <div className='col-4'>
                  <Like liked={item.liked} onClick={() => onLike(item)} />
                </div>
                <div className='col-6'>
                  {item.from} : {item.to}
                </div>
                <div className='col-6'>
                  {item.location}
                </div>
                <div className='col-12'>
                  {item.summary}
                </div>
              </Card.Body>
            </Card>
          ))}
        </Row>
      )}
    </>
  )
}

export default ProgramList
