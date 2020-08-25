import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactHtml from 'raw-html-react'
import Card from 'react-bootstrap/Card'
import fallBackImage from '../../images/fallBackImage.svg'
import { useTranslate } from 'react-translate'

const OrganizerList = ({ organizers }) => {
  const t = useTranslate('Conticki')

  return (
    <Container className='my-md-5'>
      <Row className='organizers'>
        <Col xs={12} className='my-5'>
          <h1>{t('Organizers', { n: organizers.length })}</h1>
        </Col>
        {organizers.map(organizer => (
          <Col xs={12} key={organizer.id} className='mb-3'>
            <Card className='organizer h-100'>
              <Card.Header>
                <Card.Title className='mb-0'>
                  <Link to={`/organizer/${organizer.id}`}>{organizer.title}</Link>
                </Card.Title>
              </Card.Header>
              <Row>
                <Col md={4}>
                  <Link to={`/organizer/${organizer.id}`}>
                    <img
                      className='p-md-4 img-fluid'
                      src={organizer.image?.url || fallBackImage}
                      alt={organizer.image?.meta.alt || ''}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Card.Body>
                    {organizer.description && <ReactHtml html={organizer.description} />}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        )
        )}
      </Row>
    </Container>
  )
}

OrganizerList.propTypes = {
  organizers: PropTypes.array.isRequired
}

export default OrganizerList
