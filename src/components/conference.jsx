import React, { useContext } from 'react'
import Actors from './actors'
import ConferenceInfo from './conferenceInfo'
import Program from './program'
import AppStateContext from '../context/appStateContext'
import { useTranslate } from 'react-translate'
import OrganizerTeaser from './organizer/OrganizerTeaser'
import SpeakerList from './speaker/SpeakerList'

function Conference (props) {
  const t = useTranslate('Conticki')
  const context = useContext(AppStateContext)
  const conference = context.conference.get

  return (
    <>
      <div className='mb-5'>
        {conference && (
          <ConferenceInfo />
        )}
        {context.events.get && context.tags.get && context.themes.get && (
          <Program
            eventsList={context.events.get}
            tagsList={context.tags.get}
            themesList={context.themes.get}
          />
        )}

        {context.speakers.get.length > 0 && <SpeakerList title={t('SPEAKERS')} speakers={context.speakers.get} isSubElement />}

        <OrganizerTeaser />

        {context.speakers.get && context.speakers.get.length > 0 && <Actors title={t('SPEAKERS')} actors={context.speakers.get} />}
        {context.sponsors.get && context.sponsors.get.length > 0 && <Actors title={t('SPONSORS')} actors={context.sponsors.get} />}
        {context.organizers.get && context.organizers.get.length > 0 && <Actors title={t('ORGANIZERS')} actors={context.organizers.get} />}
      </div>
    </>
  )
}

export default Conference
