import React from 'react'
import { Link } from 'react-router-dom'
import Like from './common/like'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function ProgramList ({ events, onLike, date, day }) {
  return (
    <>
      {events.length > 0 && (
        <Row>
          <Col xs={12}>
            <h3>{day}<br /><span className='text-muted'>{date}</span></h3>
          </Col>
          {events.map((item) => (
            <Col
              xs={12}
              className='mb-3'
              key={item.id}
            >
              <Card className='bg-info'>

                <Card.Body>
                  <Row>
                    <Col xs={8}>
                      <Link to={`/event/${item.id}`}>
                        <h3>{item.title}</h3>
                      </Link>
                    </Col>
                    <Col xs={4} className='text-right'>
                      <Like liked={item.liked} onClick={() => onLike(item)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <strong>{item.from} : {item.to}</strong>
                    </Col>
                    <Col xs={6}>
                      <strong>{item.location}</strong>
                    </Col>
                    <Col xs={12}>
                      {item.summary}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default ProgramList
