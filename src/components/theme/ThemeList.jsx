import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactHtml from 'raw-html-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/esm/Container'
import { useTranslate } from 'react-translate'

const ThemeList = ({ themes }) => {
  const t = useTranslate('Conticki')

  return (
    <Container className='my-md-5'>
      <Row className='themes'>
        <Col xs={12} className='my-5'>
          <h1>{t('Themes')}</h1>
        </Col>
        {themes.map(theme => (
          <Col xs={12} md={4} lg={3} key={theme.id} className='mb-3'>
            <Card className='theme h-100'>
              <Card.Body>
                <Card.Title>
                  <Link to={`/theme/${theme.id}`}>{theme.title}</Link>
                </Card.Title>
                {theme.description && <ReactHtml html={theme.description} />}
              </Card.Body>
            </Card>
          </Col>
        )
        )}
      </Row>
    </Container>
  )
}

ThemeList.propTypes = {
  themes: PropTypes.array.isRequired
}

export default ThemeList
