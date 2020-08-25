import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactHtml from 'raw-html-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import fallBackImage from '../../images/fallBackImage.svg'
import Container from 'react-bootstrap/esm/Container'
import { useTranslate } from 'react-translate'

const SponsorList = ({ sponsors }) => {
  const t = useTranslate('Conticki')

  return (
    <Container className='my-md-5'>
      <Row className='sponsors'>
        <Col xs={12} className='my-5'>
          <h1>{t('Sponsors', { n: 87 })}</h1>
        </Col>
        {sponsors.map(sponsor => (
          <Col xs={12} md={4} lg={3} key={sponsor.id} className='mb-3'>
            <Card className='sponsor h-100'>
              <Link to={`/sponsor/${sponsor.id}`} className='image-square'>
                <Card.Img
                  variant='top'
                  src={sponsor.image?.url || fallBackImage}
                  alt={sponsor.image?.meta.alt || ''}
                />
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link to={`/sponsor/${sponsor.id}`}>{sponsor.title}</Link>
                </Card.Title>
                {sponsor.description && <ReactHtml html={sponsor.description} />}
              </Card.Body>
            </Card>
          </Col>
        )
        )}
      </Row>
    </Container>
  )
}

SponsorList.propTypes = {
  sponsors: PropTypes.array.isRequired
}

export default SponsorList
