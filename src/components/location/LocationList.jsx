import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactHtml from 'raw-html-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/esm/Container'

const LocationList = ({ locations }) => (
  <Container className='my-md-5'>
    <Row className='locations'>
      <Col xs={12} className='my-5'>
        {/location/.test(window.location.href) ? <h1>Locations</h1> : <h2>Locations</h2>}
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

LocationList.propTypes = {
  locations: PropTypes.array.isRequired
}

export default LocationList
