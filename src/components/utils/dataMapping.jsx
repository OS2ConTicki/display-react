import _ from 'lodash'

export function mapElement (element) {
  return {
    id: element.id,
    title: element.attributes.title,
    type: element.type,
    description: element.attributes.description,
    image: element.attributes.image,
    summary: element.attributes.summary,
    ticketUrl: element.attributes.ticket
  }
}

export function mapEvent (event, locations) {
  event.attributes.liked = window.localStorage.getItem(event.id) === 'true'
  event.attributes.id = event.id

  event.attributes.from = mapTime(event.attributes.start_time)
  event.attributes.to = mapTime(event.attributes.end_time)
  event.attributes.startDate = mapDate(event.attributes.start_time)

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

function mapDate (inputDate) {
  const date = new Date(inputDate)
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  let helperStartDate = date.toLocaleDateString('da-DA', dateOptions)
  helperStartDate =
    helperStartDate.charAt(0).toUpperCase() + helperStartDate.slice(1)
  return helperStartDate
}

function mapTime (inputDate) {
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit'
  }
  const date = new Date(inputDate)
  return date.toLocaleTimeString('da-DA', timeOptions)
}
