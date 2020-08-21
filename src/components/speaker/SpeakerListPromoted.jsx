import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import SpeakerItem from './SpeakerItem'
import { Link } from 'react-router-dom'

const SpeakerListPromoted = ({ speakers, title }) => (
  <Container className='my-md-5'>
    <Row className='speakers'>
      <Col xs={12} className='my-5'>
        <h2>{title}</h2>
      </Col>
      {speakers.map(speaker => (
        <Col xs={12} md={4} key={speaker.id} className='mb-3'>
          <SpeakerItem speaker={speaker} />
        </Col>
      )
      )}
      <Col xs={12} className='my-5 text-center'>
        {/* TODO: Translate */}
        <Link to='/speaker/' className='btn btn-primary btn-lg'>Se alle talere</Link>
      </Col>
    </Row>
  </Container>
)

SpeakerListPromoted.propTypes = {
  speakers: PropTypes.array.isRequired
}

export default SpeakerListPromoted
