import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

const Organizer = ({ organizer }) => {
  return (
    <Row className='organizer scroll-offset-class my-md-5 py-md-5 bg-light'>
      <Col xs={12} className='text-center'>

        {/* TODO: Get info from primary organizer */}

        <h2>Arrangeret af Jobcenter Aarhus</h2>
        <p className='lead'>Hvem er vi og hvorfor har vi lavet dette arrangement</p>
        <a href='#' className='btn btn-primary btn-lg'>Læs mere om os her</a>
      </Col>
    </Row>
  )
}

Organizer.propTypes = {
  organizer: PropTypes.object
}

export default Organizer
