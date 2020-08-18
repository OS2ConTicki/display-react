import _ from 'lodash'
import { getDate } from './dateHandler'

export function mapElement (element) {
  return {
    id: element.id,
    title: element.attributes.title,
    type: element.type,
    description: element.attributes.description,
    image: element.attributes.image,
    summary: element.attributes.summary,
    ticket: element.attributes.ticket
  }
}

export function mapEvent (event, locations) {
  event.attributes.liked = window.localStorage.getItem(event.id) === 'true'
  event.attributes.id = event.id
  event.attributes.startDate = getDate(event.attributes.start_time)
  event.attributes.isEventDone = isEventDone(event.attributes.end_time)
  const tagIds = []
  if (event.relationships.tags.data) {
    event.relationships.tags.data.forEach((tag) => {
      tagIds.push(tag.id)
    })
  }
  if (event.relationships.location.data) {
    const location = _.find(locations, function (location) {
      return location.id === event.relationships.location.data.id
    })
    event.attributes.location = location.title
    event.attributes.locationId = location.id
  }
  event.attributes.tags = tagIds
  event.attributes.theme = ''
  if (event.relationships.themes.data) {
    event.attributes.theme = event.relationships.themes.data.id
  }
  return event.attributes
}

function isEventDone (inputDate) {
  const now = new Date()
  const date = new Date(inputDate)
  return date < now
}
