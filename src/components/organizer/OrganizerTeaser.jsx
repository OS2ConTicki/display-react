import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'

const Organizer = ({ organizers }) => {
  return (
    <Row className='organizer scroll-offset-class mt-md-5 py-md-5 bg-light'>
      <Col xs={12} className='text-center'>
        {/* TODO: Translate header */}
        <h2 className='lead'>Arrangeret af</h2>
        {organizers.map(organizer => (
          <Col xs={12} md={organizers.length >= 4 ? 3 : 12 / organizers.length} key={organizer.id} className='mb-3'>
            <h3 className='h2'>{organizer.title}</h3>
            <ReactHtml html={organizer.description} />
            {/* TODO: Translate button */}
            <a href={organizer.website_url} className='btn btn-primary btn-lg'>Læs mere om {organizer.title} her</a>
          </Col>
        )
        )}
      </Col>
    </Row>
  )
}

Organizer.propTypes = {
  organizer: PropTypes.object
}

export default Organizer
