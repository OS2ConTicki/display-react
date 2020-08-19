import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactHtml from 'raw-html-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import fallBackImage from '../../images/fallBackImage.svg'

const SpeakerList = ({ speakers }) => (
  <Row className='speakers'>
    {speakers.map(speaker => (
      <Col xs={6} md={4} key={speaker.id}>
        <Card className='speaker h-100'>
          <Link to={`/speaker/${speaker.id}`}>
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
      </Col>
    )
    )}
  </Row>
)

SpeakerList.propTypes = {
  speakers: PropTypes.array.isRequired
}

export default SpeakerList
