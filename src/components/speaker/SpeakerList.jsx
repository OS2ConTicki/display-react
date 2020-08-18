import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SpeakerList = ({ speakers }) => (
  <div className='speakers'>
    {speakers.map(speaker => (
      <div key={speaker.id} className='speaker'>
        <div className='title'>
          <Link to={`/speaker/${speaker.id}`}>
            {speaker.title}
          </Link>
        </div>

        {JSON.stringify(speaker)}
      </div>)
    )}
  </div>
)

SpeakerList.propTypes = {
  speakers: PropTypes.array.isRequired
}

export default SpeakerList
