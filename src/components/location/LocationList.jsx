import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactHtml from 'raw-html-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/esm/Container'
import { useTranslate } from 'react-translate'

const LocationList = ({ locations }) => {
  const t = useTranslate('Conticki')

  return (
    <Container className='my-md-5'>
      <Row className='locations'>
        <Col xs={12} className='my-5'>
          <h1>{t('Locations')}</h1>
        </Col>
        {locations.map(location => (
          <Col xs={12} md={4} lg={3} key={location.id} className='mb-3'>
            <Card className='location h-100'>
              <Card.Body>
                <Card.Title>
                  <Link to={`/location/${location.id}`}>{location.title}</Link>
                </Card.Title>
                {location.description && <ReactHtml html={location.description} />}
              </Card.Body>
            </Card>
          </Col>
        )
        )}
      </Row>
    </Container>
  )
}

LocationList.propTypes = {
  locations: PropTypes.array.isRequired
}

export default LocationList
