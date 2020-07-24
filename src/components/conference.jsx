import React, { useContext } from 'react'
import Speakers from './speakers'
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
        {context.speakers.get && context.speakers.get.length > 0 && <Speakers title='Talere' speakers={context.speakers.get} />}
        {context.sponsors.get && context.sponsors.get.length > 0 && <Speakers title='Sponsorer' speakers={context.sponsors.get} />}
        {context.organizers.get && context.organizers.get.length > 0 && <Speakers title='Arrangører' speakers={context.organizers.get} />}
      </div>
    </>
  )
}

export default Conference
