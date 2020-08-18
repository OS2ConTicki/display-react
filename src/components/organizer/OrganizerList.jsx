import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const OrganizerList = ({ organizers }) => (
  <div className='organizers'>
    {organizers.map(organizer => (
      <div key={organizer.id} className='organizer'>
        <div className='title'>
          <Link to={`/organizer/${organizer.id}`}>
            {organizer.title}
          </Link>
        </div>
        {JSON.stringify(organizer)}
      </div>)
    )}
  </div>
)

OrganizerList.propTypes = {
  organizers: PropTypes.array.isRequired
}

export default OrganizerList
