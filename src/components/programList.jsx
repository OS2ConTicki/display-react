import React from 'react'
import Row from 'react-bootstrap/Row'
import Event from './event/EventItem'
import Col from 'react-bootstrap/Col'
function ProgramList ({ events, onLike, date, day }) {
  return (
    <>
      {events.length > 0 && (
        <Row>
          <Col xs={12} className='mt-5'>
            <h3>{day}<br /><span className='text-muted'>{date}</span></h3>
          </Col>
          {events.map((item) => (
            <Col
              xs={12}
              className='mb-3'
              key={item.id}
            >
              <Event onLike={onLike} event={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default ProgramList
