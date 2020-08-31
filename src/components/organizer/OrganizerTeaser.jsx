import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'
import { useTranslate } from 'react-translate'
import { Link } from 'react-router-dom'

const Organizer = ({ organizers }) => {
  const t = useTranslate('Conticki')

  return (
    <Row className='organizer scroll-offset-class mt-md-5 py-md-5 bg-light'>
      <Col xs={12} className='text-center'>
        <h2 className='lead'>{t('Organized by')}</h2>
        {organizers.map(organizer => (
          <Col xs={12} md={organizers.length >= 4 ? 3 : 12 / organizers.length} key={organizer.id} className='mb-3'>
            <h3 className='h2'>{organizer.title}</h3>
            <ReactHtml html={organizer.description} />
            <Link to={`organizer/${organizer.id}`} className='btn btn-primary btn-lg'>
              {t('Read more about {{organizer}}', { organizer: organizer.title })}
            </Link>
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
