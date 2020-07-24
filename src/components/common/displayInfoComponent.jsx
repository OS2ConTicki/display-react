import React from 'react'
import ReactHtml from 'raw-html-react'
function DisplayInfoComponent ({ title, description, image, ticketUrl }) {
  return (
    <>
      <div className='row d-flex justify-content-center mb-3 scroll-offset-class'>
        <h1>{title}</h1>
      </div>
      <div className='row d-flex justify-content-center mb-3'>
        {image && (
          <img
            className='card-img-top'
            style={{ height: image.meta.height, width: image.meta.width }}
            src={image.url}
            alt={image.meta.alt || ''}
          />
        )}
      </div>
      <div className='row d-flex justify-content-center'>
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
