import React from 'react'
import PropTypes from 'prop-types'

const SponsorList = ({ sponsors }) => (
  <div className='sponsors'>
    {sponsors.map(sponsor => (
      <div key={sponsor.id} className='sponsor'>
        <div className='title'>{sponsor.title}</div>
        {JSON.stringify(sponsor)}
      </div>)
    )}
  </div>
)

SponsorList.propTypes = {
  sponsors: PropTypes.array.isRequired
}

export default SponsorList
