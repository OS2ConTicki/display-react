import React, { useContext } from 'react'
import ConferenceInfo from './conferenceInfo'
import Program from './program'
import AppStateContext from '../context/appStateContext'
import { useTranslate } from 'react-translate'
import OrganizerTeaser from './organizer/OrganizerTeaser'
import SponsorTeaser from './sponsor/SponsorTeaser'
import SpeakerListPromoted from './speaker/SpeakerListPromoted'

function Conference (props) {
  const t = useTranslate('Conticki')
  const context = useContext(AppStateContext)
  const conference = context.conference.get
  const promotedSpeakers = context.speakers.get.filter(speaker => speaker.promote)

  return (
    <>
      <div>
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
        {promotedSpeakers.length > 0 && <SpeakerListPromoted title={t('Speakers', { n: 87 })} speakers={promotedSpeakers} />}
        <OrganizerTeaser organizers={conference.organizers} />
        {context.sponsors.get && context.sponsors.get.length > 0 && <SponsorTeaser title={t('Sponsors', { n: 87 })} sponsors={context.sponsors.get} />}
      </div>
    </>
  )
}

export default Conference
