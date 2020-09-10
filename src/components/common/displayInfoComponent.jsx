import React from 'react'
import ReactHtml from 'raw-html-react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from '../common/Header'
import { useTranslate } from 'react-translate'
import { format } from 'date-fns'

function DisplayInfoComponent ({ title, description, image, ticket, start_time, end_time }) {
  const t = useTranslate('Conticki')

  return (
    <>
      <Row className='top scroll-offset-class'>
        <Header title={title} image={image} />
        <Container>
          <Row>
            <Col>
              <p className='lead text-white'>{format(new Date(start_time), 'eeee d. MMMM')} {t('To')} {format(new Date(end_time), 'eeee d. MMMM')}</p>
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
          {ticket && ticket.url &&
            <Row className='d-flex justify-content-center'>
              <Col xs={12} className='d-flex justify-content-center mt-3'>
                <p className='text-center'>
                  <a className='btn btn-primary btn-lg px-md-5' href={ticket.url}>{ticket.text || 'Billeter kan købes her'} </a>
                </p>
              </Col>
            </Row>}
        </Container>
      </Row>
    </>
  )
}

export default DisplayInfoComponent
