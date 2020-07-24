import React from 'react'
import Person from './common/person'

function Speakers ({ speakers, title }) {
  if (!speakers) {
    return ''
  }
  return (
    <>
      <h2 className='d-flex justify-content-center mt-5 mb-3 scroll-offset-class'>{title}</h2>
      <div id='speakers' className='row d-flex justify-content-center'>
        {speakers.map((speaker) => (
          <Person key={speaker.id} person={speaker} />
        ))}
      </div>
    </>
  )
}

export default Speakers
