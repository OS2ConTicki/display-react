import React from 'react'
import ReactHtml from 'raw-html-react'
function DisplayInfoComponent ({ title, description, image, ticketUrl }) {
  return (
    <>
      <div className='top row scroll-offset-class mb-3'>
        <div className='col-12 my-5'>
          <h1>{title}</h1>
        </div>
        <div className='col-12 mb-3'>
          {image && (
            <img
              className='img-fluid'
              height={image.meta.height}
              width={image.meta.width}
              src={image.url}
              alt={image.meta.alt || ''}
            />
          )}
        </div>
      </div>
      <div className='row d-flex justify-content-center mb-3'>
        <div className='text-center'>
          <ReactHtml html={description} />
        </div>
      </div>
      {ticketUrl && ticketUrl.url &&
        <div className='row d-flex justify-content-center'>
          {!ticketUrl.text && <p className='text-center'><a href={ticketUrl.url}>Billeter kan købes her</a></p>}
          {ticketUrl.text && <p className='text-center'><a href={ticketUrl.url}>{ticketUrl.text}</a></p>}
        </div>}
    </>
  )
}

export default DisplayInfoComponent
