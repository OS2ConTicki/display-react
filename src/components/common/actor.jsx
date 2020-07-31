import React from 'react'
import ReactHtml from 'raw-html-react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import fallBackImage from '../../fallBackImage.svg'

function Actor ({ actor }) {
  return (
    <Col xs={6} md={4}>
      <Card
        className='h-100'
      >
        {actor.image
          ? <Card.Img variant='top' src={actor.image.url} alt={actor.image.meta.alt || ''} />
          : <Card.Img variant='top' src={fallBackImage} alt='Image not available' />}
        <Card.Body>
          <Card.Title>{actor.title}</Card.Title>
          {actor.description &&
            <ReactHtml html={actor.description} />}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Actor
