import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactHtml from 'raw-html-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import fallBackImage from '../../images/fallBackImage.svg'
import Container from 'react-bootstrap/esm/Container'

const SpeakerList = ({ speakers }) => (
  <Container className='my-md-5'>
    <Row className='speakers'>
      <Col xs={12} className='my-5'>
        {/speaker/.test(window.location.href) ? <h1>Speakers</h1> : <h2>Speakers</h2>}
      </Col>
      {speakers.map(speaker => (
        <Col xs={12} md={4} lg={3} key={speaker.id} className='mb-3'>
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
        </Col>
      )
      )}
    </Row>
  </Container>
)

SpeakerList.propTypes = {
  speakers: PropTypes.array.isRequired
}

export default SpeakerList
