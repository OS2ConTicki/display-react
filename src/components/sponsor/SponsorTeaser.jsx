import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

const Sponsor = ({ sponsors }) => {
  return (
    <Row className='sponsors scroll-offset-class my-md-5 py-md-5 bg-light'>
      <Col xs={12} className='text-center'>
        <p className='lead mb-0'><strong className='mr-3' />
          {sponsors.map(sponsor => (
            <span key={sponsor.id}>{sponsor.title}</span>
          )
          )}
        </p>
      </Col>
    </Row>
  )
}

Sponsor.propTypes = {
  sponsor: PropTypes.object
}

export default Sponsor
