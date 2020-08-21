import React from 'react'
import Card from 'react-bootstrap/Card'
import ReactHtml from 'raw-html-react'
import { Link } from 'react-router-dom'
import fallBackImage from '../../images/fallBackImage.svg'

const SpeakerItem = ({ speaker }) => {
  return (
    <Card className='speaker h-100'>
      <Link to={`/speaker/${speaker.id}`} className='image-square'>
        <Card.Img
          variant='top'
          src={speaker.image?.url || fallBackImage}
          alt={speaker.image?.meta.alt || ''}
        />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/speaker/${speaker.id}`}>{speaker.title}</Link>
        </Card.Title>
        {speaker.description && <ReactHtml html={speaker.description} />}
      </Card.Body>
    </Card>
  )
}
export default SpeakerItem
