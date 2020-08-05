import React from 'react'
import ReactHtml from 'raw-html-react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import fallBackImage from '../../images/fallBackImage.svg'

function Actor ({ actor }) {
  return (
    <Col xs={6} md={4}>
      <Card className='h-100'>
        <Card.Img
          variant='top'
          src={actor.image?.url || fallBackImage}
          alt={actor.image?.meta.alt || ''}
        />
        <Card.Body>
          <Card.Title>
            <Link to={`/${actor.type}/${actor.id}`}>{actor.title}</Link>
          </Card.Title>
          {actor.description && <ReactHtml html={actor.description} />}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Actor
