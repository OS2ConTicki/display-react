import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactHtml from 'raw-html-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import fallBackImage from '../../images/fallBackImage.svg'
import Container from 'react-bootstrap/esm/Container'

const SpeakerList = ({ speakers, isSubElement }) => (
  <Container className='my-md-5'>
    <Row className='speakers'>
      <Col xs={12} className='my-5'>
        {isSubElement ? <h2>Speakers</h2> : <h1>Speakers</h1>}
      </Col>

      {speakers.slice(0, isSubElement ? 3 : speakers.length).map(speaker => (
        <Col xs={12} md={isSubElement ? 4 : 4} lg={isSubElement ? 4 : 3} key={speaker.id} className='mb-3'>
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
      {isSubElement &&
        <Col xs={12} className='my-5 text-center'>
          {/* TODO: Translate */}
          <a href='/speaker/' className='btn btn-primary btn-lg'>Se alle talere</a>
        </Col>}
    </Row>
  </Container>
)

SpeakerList.propTypes = {
  speakers: PropTypes.array.isRequired,
  isSubElement: PropTypes.bool
}

export default SpeakerList
