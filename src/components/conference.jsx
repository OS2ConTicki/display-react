import React, { useContext } from 'react'
import Actors from './actors'
import ConferenceInfo from './conferenceInfo'
import Program from './program'
import AppStateContext from '../context/appStateContext'

function Conference (props) {
  const context = useContext(AppStateContext)

  return (
    <>
      <div>
        {context.conference.get && (
          <ConferenceInfo />
        )}
        {context.events.get && context.tags.get && context.themes.get && (
          <Program
            eventsList={context.events.get}
            tagsList={context.tags.get}
            themesList={context.themes.get}
          />
        )}
        {context.speakers.get && context.speakers.get.length > 0 && <Actors title='Talere' actors={context.speakers.get} />}
        {context.sponsors.get && context.sponsors.get.length > 0 && <Actors title='Sponsorer' actors={context.sponsors.get} />}
        {context.organizers.get && context.organizers.get.length > 0 && <Actors title='Arrangører' actors={context.organizers.get} />}
      </div>
    </>
  )
}

export default Conference
