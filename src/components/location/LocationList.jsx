import React from 'react'
import PropTypes from 'prop-types'

const LocationList = ({ locations }) => (
  <div className='locations'>
    {locations.map(location => (
      <div key={location.id} className='location'>
        <div className='title'>{location.title}</div>
        {JSON.stringify(location)}
      </div>)
    )}
  </div>
)

LocationList.propTypes = {
  locations: PropTypes.array.isRequired
}

export default LocationList
