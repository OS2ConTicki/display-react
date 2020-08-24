import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ReactHtml from 'raw-html-react'

const Theme = ({ theme }) => {
  // Unwrap the theme object.
  const { title, description } = theme

  return (
    <div className='theme'>
      <Row className='top scroll-offset-class'>
        <Container className='my-md-5'>
          <Row>
            <Col md={12} className='my-5'>
              <h1>{title}</h1>
            </Col>
          </Row>
        </Container>
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
    </div>
  )
}

Theme.propTypes = {
  theme: PropTypes.object
}

export default Theme
