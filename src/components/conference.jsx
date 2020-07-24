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
        {context.conference.get && context.tags.get && context.themes.get && (
          <ConferenceInfo />
        )}
        {/* <Events /> */}
        {context.events.get && context.tags.get && context.themes.get && (
          <Program
            eventsList={context.events.get}
            tagsList={context.tags.get}
            themesList={context.themes.get}
          />
        )}
        {context.speakers.get && <Speakers speakers={context.speakers.get} />}
      </div>
    </>
  )
}

export default Conference
