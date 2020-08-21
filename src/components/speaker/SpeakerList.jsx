import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import SpeakerItem from './SpeakerItem'
import { useTranslate } from 'react-translate'

const SpeakerList = ({ speakers, title }) => {
  const t = useTranslate('Conticki')

  return (
    <Container className='my-md-5'>
      <Row className='speakers'>
        <Col xs={12} className='my-5'>
          <h1>{title || t('Speakers', { n: speakers.length })}</h1>
        </Col>

        {speakers.map(speaker => (
          <Col xs={12} md={4} key={speaker.id} className='mb-3'>
            <SpeakerItem speaker={speaker} />
          </Col>
        )
        )}
      </Row>
    </Container>
  )
}

SpeakerList.propTypes = {
  speakers: PropTypes.array.isRequired
}

export default SpeakerList
