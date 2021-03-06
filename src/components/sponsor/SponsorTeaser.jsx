import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-translate'
import ReactHtml from 'raw-html-react'
import { Link } from 'react-router-dom'

const Sponsor = ({ sponsors }) => {
  const t = useTranslate('Conticki')

  return (
    <Row className='sponsors py-md-5 bg-light'>
      <Container>
        <Col xs={12} className='text-center'>
          <h2 className='lead'>{t('Sponsored by')}</h2>
          <Row>
            {sponsors.map(sponsor => (
              <Col xs={12} md={sponsors.length >= 4 ? 3 : 12 / sponsors.length} key={sponsor.id} className='mb-3'>
                <h3 className='h2'>{sponsor.title}</h3>
                {sponsor.summary ? <p className='summary'>{sponsor.summary}</p> : <ReactHtml html={sponsor.description} />}
                <Link to={`sponsor/${sponsor.id}`} className='btn btn-primary btn-lg'>
                  {t('Read more about {{sponsor}}', { sponsor: sponsor.title })}
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Container>
    </Row>
  )
}

Sponsor.propTypes = {
  sponsor: PropTypes.object
}

export default Sponsor
