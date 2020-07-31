import React, { useState } from 'react'
import _ from 'lodash'
import ProgramTable from './programTable'
import TagList from './tags'
import SearchBox from './common/searchBox'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Collapse from 'react-bootstrap/Collapse'

function Program ({ eventsList, tagsList, themesList }) {
  const allEventsTag = { title: 'Alle emner', id: '' }
  const allEventsThemes = { title: 'Alle temaer', id: '' }
  const [events, setEvents] = useState(eventsList)
  const [selectedTag, setSelectedTag] = useState(allEventsTag)

  const [tags] = useState([allEventsTag, ...tagsList])
  const [tabs] = useState([allEventsThemes, ...themesList])
  const [searchText, setSearchText] = useState('')

  const [dates] = useState(getDates())
  function getDates () {
    const returnDatesArray = []
    events.forEach((event) => {
      returnDatesArray.push(event.startDate)
    })
    return _.uniq(returnDatesArray)
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
      <Row
        className='mt-3 mb-3 scroll-offset-class'
        id='program'
      >
        <Col xs={8}>
          <h2>
            Program
          </h2>
        </Col>
        <Col xs={4}>
          <Button
            variant='secondary'
            onClick={() => setOpen(!open)}
            aria-controls='searchEvent'
            aria-expanded={open}
          >
            Find event
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

              {tabs && (
                <TagList
                  title='Temaer'
                  items={tabs}
                  textProperty='title'
                  valueProperty='id'
                  selectedItem={selectedTag}
                  onItemSelect={handleTagSelect}
                />
              )}

            </div>
          </Collapse>
          <p className='text-muted mt-3'>{eventString}</p>
          {dates.map((date) => (
            <ProgramTable
              key={date}
              events={filteredEvents.filter(
                (event) => event.startDate === date
              )}
              onLike={handleLike}
            />
          ))}
        </Col>
      </Row>
    </>
  )
}

export default Program
