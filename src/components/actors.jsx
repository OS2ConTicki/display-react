import React from 'react'
import Actor from './common/actor'

function Actors ({ actors, title }) {
  return (
    <>
      <h2 className='d-flex justify-content-center mt-5 mb-3 scroll-offset-class'>{title}</h2>
      <div id={actors[0].type} className='row d-flex justify-content-center'>
        {actors.map((actor) => (
          <Actor key={actor.id} actor={actor} />
        ))}
      </div>
    </>
  )
}

export default Actors
