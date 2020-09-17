import React, { useContext, useState } from 'react'
import _ from 'lodash'
import ProgramList from './programList'
import BadgeList from './badgeList'
import SearchBox from './common/searchBox'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Collapse from 'react-bootstrap/Collapse'
import Container from 'react-bootstrap/Container'
import { useTranslate } from 'react-translate'
import { getDateByLanguage, getDayByLanguage } from './utils/dateHandler'
import AppStateContext from '../context/appStateContext'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'
import IconButton from './common/IconButton'

function Program ({ eventsList, tagsList, themesList }) {
  const t = useTranslate('Conticki')
  const context = useContext(AppStateContext)
  const allEventsTag = { title: 'Alle emner', id: '' }
  const allEventsTheme = { title: 'Alle temaer', id: '' }
  const allEventsDay = { title: 'Alle dage', id: '' }
  const [events, setEvents] = useState(eventsList)
  const [selectedTag, setSelectedTag] = useState(allEventsTag)
  const [selectedTheme, setSelectedTheme] = useState(allEventsTheme)
  const [selectedDay, setSelectedDay] = useState(allEventsDay)
  const [tags] = useState([allEventsTag, ...tagsList])
  const [themes] = useState([allEventsTheme, ...themesList])
  const [searchText, setSearchText] = useState('')
  const [dates] = useState(getDates())
  const [days] = useState([allEventsDay, ...getDays()])
  const [open, setOpen] = useState(false)
  const [showMyEvents, setShowMyEvents] = useState(false)

  function getDates () {
    const returnDatesArray = []
    events.forEach((event) => {
      returnDatesArray.push({
        displayDate: getDateByLanguage(event.start_time, context.language.get),
        displayDay: getDayByLanguage(event.start_time, context.language.get),
        date: event.start_time,
        id: event.startDate
      })
    })
    return _.uniqBy(returnDatesArray, function (date) {
      return date.id
    })
  }
  function getDays () {
    const days = []
    const dates = getDates()
    dates.forEach((date) => {
      days.push({ id: date.id, title: `${date.displayDay} ${date.displayDate}` })
    })
    return days
  }

  function handleLike (event) {
    const isEventAlreadyLiked =
      window.localStorage.getItem(event.id) === 'true'
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
  }

  function handleTagSelect (tag) {
    setSelectedTag(tag)
    setSearchText('')
  }

  function handleDaySelect (day) {
    setSelectedDay(day)
    setSearchText('')
  }

  function handleSearch (searchText) {
    setSearchText(searchText)
  }

  function getPagedData () {
    let filteredEvents = [...events]
    if (searchText) {
      const search = searchText.toLocaleLowerCase()
      filteredEvents = filteredEvents.filter(
        (event) => event.search && event.search.includes(search)
      )
    }
    if (selectedTag.id) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.tags && event.tags.filter(tag => tag.id === selectedTag.id).length > 0
      })
    }

    if (selectedTheme.id) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.themes && event.themes.filter(theme => theme.id === selectedTheme.id).length > 0
      })
    }

    if (selectedDay.id) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.startDate === selectedDay.id
      })
    }

    if (showMyEvents) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.liked === showMyEvents
      })
    }

    return { totalCount: filteredEvents?.length, filteredEvents }
  }

  const { filteredEvents, totalCount } = getPagedData()
  let eventString =
    totalCount === 0
      ? t('NO_EVENTS')
      : t('NUMBER_OF_EVENTS', { n: totalCount })

  if (selectedTheme.id && selectedTag.id) {
    eventString +=
      t('WITH_THEME', { theme: selectedTheme.title }) +
      t('AND_WITH_TAG', { tag: selectedTag.title })
  } else if (selectedTheme.id) {
    eventString += t('WITH_THEME', { theme: selectedTheme.title })
  } else if (selectedTag.id) {
    eventString += t('WITH_TAG', { tag: selectedTag.title })
  }

  return (
    <Row>
      <Container>
        <Row className='mt-3 mb-3 scroll-offset-class' id='program'>
          <Col xs={6}>
            <h2>{t('Program')}</h2>
          </Col>
          <Col xs={6} className='text-right'>
            <Button
              variant='secondary'
              onClick={() => setOpen(!open)}
              aria-controls='searchEvent'
              aria-expanded={open}
              className='mt-2 filter-events'
            >
              {t('Search events')}
            </Button>
          </Col>
          <Col xs={12}>
            <Collapse in={open} className='bg-light border p-3 rounded-sm'>
              <div id='searchEvent' className='searchEvent mb-3'>
                <SearchBox value={searchText} onChange={handleSearch} />
                {/* We check for lenght more than 1 since we wil allways have an "All themes" entry */}
                {themes && themes.length > 1 && (
                  <div className='mb-3'>
                    <BadgeList
                      title={t('Themes', { n: 87 })}
                      items={themes}
                      textProperty='title'
                      valueProperty='id'
                      selectedItem={selectedTheme}
                      onItemSelect={handleThemeSelect}
                    />
                  </div>)}
                {/* We check for lenght more than 1 since we wil allways have an "All tags" entry */}
                {tags && tags.length > 1 && (
                  <BadgeList
                    title={t('Tags', { n: 87 })}
                    items={tags}
                    textProperty='name'
                    valueProperty='id'
                    selectedItem={selectedTag}
                    onItemSelect={handleTagSelect}
                  />
                )}
              </div>
            </Collapse>

            {days && days.length > 2 && (
              <div className='mb-3'>
                <BadgeList
                  items={days}
                  textProperty='name'
                  valueProperty='id'
                  selectedItem={selectedDay}
                  onItemSelect={handleDaySelect}
                />
              </div>
            )}

            <IconButton
              variant='primary'
              onClick={() => setShowMyEvents(!showMyEvents)}
              icon={{
                icon: showMyEvents ? faHeartOutline : faHeartSolid,
                size: 'lg'
              }}
            >
              {showMyEvents ? t('Show all events') : t('Show my events')}
            </IconButton>
            {totalCount === 0 &&
              <p className='text-muted mt-3'>{eventString}</p>}
            {dates.map((date) => (
              <ProgramList
                key={date.id}
                events={filteredEvents.filter((event) => {
                  return event.startDate === date.id
                })}
                onLike={handleLike}
                date={getDateByLanguage(date.date, context.language.get)}
                day={getDayByLanguage(date.date, context.language.get)}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </Row>
  )
}

export default Program
