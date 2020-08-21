import React, { useContext, useEffect, useState } from 'react'
import NavBar from './components/navBar'
import AppInstallBanner from './components/appInstallBanner'
import { Route, Switch, useParams } from 'react-router-dom'
import Conference from './components/conference'
import AppStateContext from './context/appStateContext'
import { mapElement, mapEvent } from './components/utils/dataMapping'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { TranslatorProvider } from 'react-translate'
import Footer from './components/footer'
import Event from './components/event/Event'
import EventList from './components/event/EventList'
import Location from './components/location/Location'
import LocationList from './components/location/LocationList'
import Organizer from './components/organizer/Organizer'
import OrganizerList from './components/organizer/OrganizerList'
import Speaker from './components/speaker/Speaker'
import SpeakerList from './components/speaker/SpeakerList'
import Sponsor from './components/sponsor/Sponsor'
import SponsorList from './components/sponsor/SponsorList'

function App (props) {
  const [conference, setConference] = useState()
  const [events, setEvents] = useState()
  const [tags, setTags] = useState()
  const [themes, setThemes] = useState()
  const [speakers, setSpeakers] = useState()
  const [organizers, setOrganizers] = useState()
  const [sponsors, setSponsors] = useState()
  const [locations, setLocations] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [language, setLanguage] = useState('da')

  const store = {
    conference: { get: conference, set: setConference },
    events: { get: events, set: setEvents },
    tags: { get: tags, set: setTags },
    themes: { get: themes, set: setThemes },
    speakers: { get: speakers, set: setSpeakers },
    organizers: { get: organizers, set: setOrganizers },
    sponsors: { get: sponsors, set: setSponsors },
    locations: { get: locations, set: setLocations },
    language: { get: language, set: setLanguage }
  }
  let translations
  if (language === 'en') {
    translations = {
      locale: 'en',
      Conticki: {
        'OS2Contiki - Conference and ticket management': 'OS2Contiki - Conference and ticket management',
        'Search events': 'Search events',
        Program: 'Program',
        Themes: ['Theme', 'Themes'],
        Tags: 'Tags',
        When: 'When',
        Where: 'Where',
        Home: 'Frontpage',
        NUMBER_OF_EVENTS: ['This conference has {{n}} event', 'This conference has {{n}} events'],
        WITH_THEME: ' with the theme {{theme}}',
        WITH_TAG: ' with the tag {{tag}}',
        AND_WITH_TAG: ' and with the tag {{tag}}',
        NO_EVENTS: 'This conference has no events',
        Speakers: ['Speaker', 'Speakers'],
        Organizers: ['Organizer', 'Organizers'],
        Sponsors: ['Sponsor', 'Sponsors'],
        'Show all events': 'Show all events',
        'Show my events': 'Show my events',
        'Buy ticket': 'Buy ticket',
        'Select language': 'Select language',
        Dansk: 'Dansk',
        English: 'English',
        'Organized by': 'Organized by',
        'Read more about {{organizer}}': 'Read more about {{organizer}}',
        'See all speakers': 'See all speakers'
      }
    }
  } else {
    translations = {
      locale: 'da',
      Conticki: {
        'OS2Contiki - Conference and ticket management': 'OS2Contiki - konference- og billetsystem',
        'Search events': 'Søg i events',
        Program: 'Program',
        Themes: ['Tema', 'Temaer'],
        Tags: 'Emner',
        When: 'Hvornår',
        Where: 'Hvor',
        Home: 'Forside',
        NUMBER_OF_EVENTS: ['Der er et {{n}} event tilknyttet denne konference', 'Der er {{n}} events tilknyttet denne konference'],
        WITH_THEME: ' med temaet {{theme}}',
        WITH_TAG: ' med emnet {{tag}}',
        AND_WITH_TAG: ' og med emnet {{tag}}',
        NO_EVENTS: 'Der er ingen events tilknyttet denne konference',
        Speakers: ['Oplægsholder', 'Oplægsholdere'],
        Organizers: ['Arrangør', 'Arrangører'],
        Sponsors: ['Sponsor', 'Sponsorer'],
        'Show all events': 'Vis alle events',
        'Show my events': 'Vis mine events',
        'Buy ticket': 'Buy ticket',
        'Select language': 'Vælg sprog',
        Dansk: 'Dansk',
        English: 'English',
        'Organized by': 'Arrangeret af',
        'Read more about {{organizer}}': 'Læs mere om {{organizer}}',
        'See all speakers': 'Se alle oplægsholdere'
      }
    }
  }

  const getMappedEntities = (data, entities = {}) => {
    const included = data.included ?? []
    // Group entities by type and index by id.
    for (const entity of included) {
      if (typeof entities[entity.type] === 'undefined') {
        entities[entity.type] = {}
      }
      entities[entity.type][entity.id] = entity
    }
    // Expand the entities
    for (const map of Object.values(entities)) {
      for (const [id, element] of Object.entries(map)) {
        map[id] = mapElement(element, entities)
      }
    }

    return entities
  }

  const fetchOptions = { headers: { accept: 'application/json' } }
  const fetchEvents = (url, entities) => {
    window.fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (conference !== null) {
          // Add entities related to the events.
          entities = getMappedEntities(data, entities)

          const events = data.data.map(
            event => mapEvent(event, entities)
          )
          setLocations(Object.values(entities.location ?? {}))
          setOrganizers(Object.values(entities.organizer ?? {}))
          setSpeakers(Object.values(entities.speaker ?? {}))
          setSponsors(Object.values(entities.sponsor ?? {}))
          setTags(Object.values(entities.tag ?? {}))
          setThemes(Object.values(entities.theme ?? {}))
          setEvents(events)
          setLoading(false)
        }
      }).catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    window.fetch(props.url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        const entities = getMappedEntities(data)
        setConference(mapElement(data.data, entities))
        setLanguage(data.data.attributes.langcode)
        const allUrl = data?.data?.links?.all?.href

        if (allUrl) {
          // Pass along the entities related to the conference.
          fetchEvents(allUrl, entities)
        }
      }).catch(() => {
        setError(true)
        setLoading(false)
      }
      )
  }, [])

  // Detects if device is on iOS
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent)
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone)

  const ShowEvent = () => {
    const context = useContext(AppStateContext)
    const { id } = useParams()
    const event = context.events.get.find(event => event.id === id)

    return <Event event={event} />
  }

  const ListEvent = () => {
    const context = useContext(AppStateContext)
    const events = context.events.get

    return <EventList events={events} />
  }

  const ShowLocation = () => {
    const context = useContext(AppStateContext)
    const { id } = useParams()
    const location = context.locations.get.find(location => location.id === id)

    return <Location location={location} />
  }

  const ListLocation = () => {
    const context = useContext(AppStateContext)
    const locations = context.locations.get

    return <LocationList locations={locations} />
  }

  const ShowOrganizer = () => {
    const context = useContext(AppStateContext)
    const { id } = useParams()
    const organizer = context.organizers.get.find(organizer => organizer.id === id)

    return <Organizer organizer={organizer} />
  }

  const ListOrganizer = () => {
    const context = useContext(AppStateContext)
    const organizers = context.organizers.get

    return <OrganizerList organizers={organizers} />
  }

  const ShowSpeaker = () => {
    const context = useContext(AppStateContext)
    const { id } = useParams()
    const speaker = context.speakers.get.find(speaker => speaker.id === id)

    return <Speaker speaker={speaker} />
  }

  const ListSpeaker = () => {
    const context = useContext(AppStateContext)
    const speakers = context.speakers.get

    return <SpeakerList speakers={speakers} />
  }

  const ShowSponsor = () => {
    const context = useContext(AppStateContext)
    const { id } = useParams()
    const sponsor = context.sponsors.get.find(sponsor => sponsor.id === id)

    return <Sponsor sponsor={sponsor} />
  }

  const ListSponsor = () => {
    const context = useContext(AppStateContext)
    const sponsors = context.sponsors.get

    return <SponsorList sponsors={sponsors} />
  }

  return (
    <TranslatorProvider translations={translations}>
      {!loading && !error &&
        <AppStateContext.Provider value={store}>
          <NavBar />
          <Container fluid>
            <Switch>
              <Route path='/event/:id' component={ShowEvent} />
              <Route path='/event' component={ListEvent} />
              <Route path='/location/:id' component={ShowLocation} />
              <Route path='/location' component={ListLocation} />
              <Route path='/organizer/:id' component={ShowOrganizer} />
              <Route path='/organizer' component={ListOrganizer} />
              <Route path='/speaker/:id' component={ShowSpeaker} />
              <Route path='/speaker' component={ListSpeaker} />
              <Route path='/sponsor/:id' component={ShowSponsor} />
              <Route path='/sponsor' component={ListSponsor} />
              {/* Default: show conference */}
              <Route path='*' component={Conference} />
            </Switch>
          </Container>
          <Footer />
          {isIos() && !isInStandaloneMode() &&
            <AppInstallBanner />}
        </AppStateContext.Provider>}
      {loading &&
        <FontAwesomeIcon
          icon={faSpinner}
        />}
      {error &&
        <Col className='mt-5'>
          <Alert variant='danger'>
          Der skete en fejl!
          </Alert>
        </Col>}
    </TranslatorProvider>
  )
}

export default App
