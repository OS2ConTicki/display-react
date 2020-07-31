import React, { useState } from 'react'
import _ from 'lodash'
import ProgramList from './programList'
import TagList from './tags'
import SearchBox from './common/searchBox'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Collapse from 'react-bootstrap/Collapse'
import Container from 'react-bootstrap/Container'

function Program ({ eventsList, tagsList, themesList }) {
  const allEventsTag = { title: 'Alle emner', id: '' }
  const allEventsTheme = { title: 'Alle temaer', id: '' }
  const [events, setEvents] = useState(eventsList)
  const [selectedTag, setSelectedTag] = useState(allEventsTag)
  const [selectedTheme, setSelectedTheme] = useState(allEventsTheme)

  const [tags] = useState([allEventsTag, ...tagsList])
  const [themes] = useState([allEventsTheme, ...themesList])
  const [searchText, setSearchText] = useState('')

  const [dates] = useState(getDates())
  function getDates () {
    const returnDatesArray = []
    events.forEach((event) => {
      returnDatesArray.push({ date: event.startDate, day: event.day })
    })
    return _.uniqBy(returnDatesArray, function (date) {
      return date.date
    })
  }

  function handleLike (event) {
    const isEventAlreadyLiked = window.localStorage.getItem(event.id) === 'true'
    if (isEventAlreadyLiked) {
      window.localStorage.setItem(event.id, false)
    } else {
      window.localStorage.setItem(event.id, true)
    }

    const eventToEdit = { ...event }
    eventToEdit.liked = !eventToEdit.liked
    const eventsCopy = [...events]
    const index = eventsCopy.indexOf(event)
    eventsCopy[index] = eventToEdit
    setEvents(eventsCopy)
  }

  function handleThemeSelect (theme) {
    setSelectedTheme(theme)
    setSearchText('')
    // setCurrentPage(1)
  }

  function handleTagSelect (tag) {
    setSelectedTag(tag)
    setSearchText('')
    // setCurrentPage(1)
  }

  function handleSearch (searchText) {
    setSearchText(searchText)
    // setCurrentPage(1)
  }

  function getPagedData () {
    let filteredEvents = [...events]
    if (searchText) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title?.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          event.description?.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1 ||
          event.startDate?.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1 ||
          event.day?.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1 ||
          event.from?.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          event.to?.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          event.location?.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
    }
    if (selectedTag && selectedTag.id) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.tags.includes(selectedTag.id)
      })
    }

    if (selectedTheme && selectedTheme.id) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.theme === selectedTheme.id
      })
    }

    return { totalCount: filteredEvents?.length, filteredEvents }
  }

  const { filteredEvents, totalCount } = getPagedData()
  let eventString =
    totalCount === 0
      ? 'Der er ingen events tilknyttet denne konference'
      : `Der er ${totalCount} events tilknyttet denne konference`
  if (selectedTag && selectedTag.id) {
    eventString += ` med emnet ${selectedTag.title}`
  }

  const [open, setOpen] = useState(false)

  return (
    <>
      <Container>
        <Row
          className='mt-3 mb-3 scroll-offset-class'
          id='program'
        >
          <Col xs={8}>
            <h2>
              Program
            </h2>
          </Col>
          <Col xs={4} className='text-right'>
            <Button
              variant='secondary'
              onClick={() => setOpen(!open)}
              aria-controls='searchEvent'
              aria-expanded={open}
            >
              Søg i events
            </Button>
          </Col>
          <Col xs={12}>
            <Collapse
              in={open}
              className='bg-light p-3 rounded-sm'
            >
              <div id='searchEvent' className='searchEvent'>
                <SearchBox value={searchText} onChange={handleSearch} />

                <div className='mb-3'>
                  {tags && (
                    <TagList
                      title='Emner'
                      items={tags}
                      textProperty='name'
                      valueProperty='id'
                      selectedItem={selectedTag}
                      onTagSelect={handleTagSelect}
                    />
                  )}
                </div>

                {themes && (
                  <TagList
                    title='Temaer'
                    items={themes}
                    textProperty='title'
                    valueProperty='id'
                    selectedItem={selectedTheme}
                    onTagSelect={handleThemeSelect}
                  />
                )}

              </div>
            </Collapse>
            <p className='text-muted mt-3'>{eventString}</p>
            {dates.map((date) => (
              <ProgramList
                key={date.date}
                events={filteredEvents.filter(
                  (event) => event.startDate === date.date
                )}
                onLike={handleLike}
                date={date.date}
                day={date.day}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Program
