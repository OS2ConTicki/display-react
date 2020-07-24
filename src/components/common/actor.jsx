import React from 'react'
import ReactHtml from 'raw-html-react'

function Actor ({ actor }) {
  return (
    <div className='card m-2' style={{ width: '15rem' }}>
      {actor.image &&
        <img
          className='card-img-top'
          style={{ height: '15rem' }}
          src={actor.image.url}
          alt={actor.image.meta.alt || ''}
        />}
      <div className='card-body'>
        <h3 className='card-title'>{actor.title}</h3>
        {actor.description &&
          <div className='card-text'>
            <ReactHtml html={actor.description} />
          </div>}
      </div>
    </div>
  )
}

export default Actor
