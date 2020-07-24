import React from 'react'

function Actor ({ actor }) {
  debugger
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
        {actor.description && <p className='card-text'>{actor.description}</p>}
      </div>
    </div>
  )
}

export default Actor
