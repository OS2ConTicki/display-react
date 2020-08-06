import React, { useState, useEffect } from 'react'
import NavBar from './components/navBar'
import AppInstallBanner from './components/appInstallBanner'
import { Route, Redirect, Switch } from 'react-router-dom'
import EntityMapper from './components/entityMapper'
import Conference from './components/conference'
import AppStateContext from './context/appStateContext'
import { mapEvent, mapElement } from './components/utils/dataMapping'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { TranslatorProvider } from 'react-translate'
import Footer from './components/footer'

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
        SEARCH_EVENTS: 'Search events',
        PROGRAM: 'Program',
        THEMES: 'Themes',
        TAGS: 'Tags',
        NUMBER_OF_EVENTS: ['This conference has {{n}} event', 'This conference has {{n}} events'],
        WITH_THEME: ' with the theme {{theme}}',
        WITH_TAG: ' with the tag {{tag}}',
        AND_WITH_TAG: ' and with the tag {{tag}}',
        NO_EVENTS: 'This conference has no events',
        SPEAKERS: 'Speakers',
        ORGANIZERS: 'Organizers',
        SPONSORS: 'Sponsors'
      }
    }
  } else {
    translations = {
      locale: 'da',
      Conticki: {
        SEARCH_EVENTS: 'Søg i events',
        PROGRAM: 'Program',
        THEMES: 'Temaer',
        TAGS: 'Emner',
        NUMBER_OF_EVENTS: ['Der er et {{n}} event tilknyttet denne konference', 'Der er {{n}} events tilknyttet denne konference'],
        WITH_THEME: ' med temaet {{theme}}',
        WITH_TAG: ' med emnet {{tag}}',
        AND_WITH_TAG: ' og med emnet {{tag}}',
        NO_EVENTS: 'Der er ingen events tilknyttet denne konference',
        SPEAKERS: 'Talere',
        ORGANIZERS: 'Arrangører',
        SPONSORS: 'Sponsorer'

      }
    }
  }

  const fetchOptions = { headers: { accept: 'application/json' } }
  const fetchData = (url) => {
    window.fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (conference !== null) {
          const allIncludedElements = []
          const events = []

          if (data.included) {
            data.included.forEach((includedData) => {
              allIncludedElements.push(mapElement(includedData))
            })
          }
          setThemes(
            allIncludedElements.filter((included) => included.type === 'theme')
          )
          setTags(
            allIncludedElements.filter((included) => included.type === 'tag')
          )
          setSpeakers(
            allIncludedElements.filter(
              (included) => included.type === 'speaker'
            )
          )
          setOrganizers(
            allIncludedElements.filter(
              (included) => included.type === 'organizer'
            )
          )
          setSponsors(
            allIncludedElements.filter(
              (included) => included.type === 'sponsor'
            )
          )
          setLocations(
            allIncludedElements.filter(
              (included) => included.type === 'location'
            )
          )
          data.data.forEach((event) => {
            events.push(
              mapEvent(
                event,
                allIncludedElements.filter(
                  (included) => included.type === 'location'
                )
              )
            )
          })
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
        setConference(mapElement(data.data))
        setLanguage(data.data.attributes.langcode)
        const allUrl = data?.data?.links?.all?.href

        if (allUrl) {
          fetchData(allUrl)
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

  return (
    <TranslatorProvider translations={translations}>
      {!loading && !error &&
        <AppStateContext.Provider value={store}>
          <NavBar />
          <Container fluid>
            <Switch>
              <Route path='/konference' component={Conference} />
              <Route path='/event/:id' component={EntityMapper} />
              <Route path='/organizer/:id' component={EntityMapper} />
              <Route path='/sponsor/:id' component={EntityMapper} />
              <Route path='/speaker/:id' component={EntityMapper} />
              <Redirect from='/' to='/konference' />
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
