import React from 'react'
import Actor from './common/actor'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Actors ({ actors, title }) {
  return (
    <>
      <Row>
        <Col>
          <h2 className='mt-3 mb-3 scroll-offset-class'>{title}</h2>
          <Row id={actors[0].type}>
            {actors.map((actor) => (
              <Actor key={actor.id} actor={actor} />
            ))}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Actors
