import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'
import EventList from '../event/EventList'
import { useTranslate } from 'react-translate'
import Header from '../common/Header'

const Sponsor = ({ sponsor }) => {
  const t = useTranslate('Conticki')
  // Unwrap the sponsor object.
  const { title, image, description } = sponsor

  return (
    <div className='sponsor'>
      <Row className='top scroll-offset-class'>
        <Header title={title} image={image} />
      </Row>
      <Row className='py-3 bg-light'>
        <Container>
          <Row>
            <Col xs={12} className='d-flex mt-3'>
              <ReactHtml html={description} />
            </Col>
          </Row>
        </Container>
      </Row>
      {sponsor.events &&
        <Row className='py-3'>
          <Container>
            <Row>
              <Col xs={12} className='d-flex mt-3'>
                <h2 className='h4'>{t('Sponsor for')}</h2>
              </Col>
            </Row>
          </Container>
          <Col xs={12} className='d-flex mt-3'>
            <EventList events={sponsor.events} />
          </Col>
        </Row>}
    </div>
  )
}

Sponsor.propTypes = {
  sponsor: PropTypes.object
}

export default Sponsor
