import React, { useState, useEffect } from 'react'
import NavBar from './components/navBar'
import { Route, Redirect, Switch } from 'react-router-dom'
import EventComponent from './components/event'
import Conference from './components/conference'
import AppStateContext from './context/appStateContext'
import { mapEvent } from './components/utils/dataMapping'

function App (props) {
  const [conference, setConference] = useState()
  const [events, setEvents] = useState()
  const [tags, setTags] = useState()
  const [themes, setThemes] = useState()
  const [speakers, setSpeakers] = useState()
  const [organizers, setOrganizers] = useState()
  const [sponsors, setSponsors] = useState()
  const [locations, setLocations] = useState()

  const store = {
    conference: { get: conference, set: setConference },
    events: { get: events, set: setEvents },
    tags: { get: tags, set: setTags },
    themes: { get: themes, set: setThemes },
    speakers: { get: speakers, set: setSpeakers },
    organizers: { get: organizers, set: setOrganizers },
    sponsors: { get: sponsors, set: setSponsors },
    locations: { get: locations, set: setLocations }
  }
  const fetchOptions = { headers: { accept: 'application/json' } }
  const fetchData = (url) => {
    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (conference !== null) {
          const allIncludedElements = []
          const events = []

          if (data.included) {
            data.included.forEach((includedData) => {
              allIncludedElements.push({
                id: includedData.id,
                title: includedData.attributes.title,
                type: includedData.type,
                description: includedData.attributes.description,
                image: includedData.attributes.image
              })
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
        }
      })
  }

  useEffect(() => {
    fetch(props.url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        setConference(data.data)
        const allUrl = data?.data?.links?.all?.href

        if (allUrl) {
          fetchData(allUrl)
        }
        // TODO errorhandling man
      })
  }, [])

  return (
    <>
      <NavBar />
      <main className='container'>
        <AppStateContext.Provider value={store}>
          <Switch>
            <Route path='/konference' component={Conference} />
            <Route path='/event/:id' component={EventComponent} />
            <Redirect from='/' to='/konference' />
          </Switch>
        </AppStateContext.Provider>
      </main>
    </>
  )
}

export default App
