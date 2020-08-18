import { getDate } from './dateHandler'

export function mapElement (element, entities = {}) {
  const data = {
    id: element.id,
    type: element.type
  }

  // Map all attributes.
  for (const [name, value] of Object.entries(element.attributes)) {
    data[name] = value
  }

  // Expand all relationships.
  if (entities && element.relationships) {
    const getEntity = (item) => {
      const { type, id } = item

      return (entities[type] && entities[type][id]) ? entities[type][id] : null
    }

    for (const [name, relationship] of Object.entries(element.relationships)) {
      if (relationship.data) {
        data[name] = Array.isArray(relationship.data)
          ? relationship.data.map(getEntity)
          : getEntity(relationship.data)
      }
    }
  }

  return data
}

export function mapEvent (event, entities) {
  const data = mapElement(event, entities)
  data.liked = window.localStorage.getItem(event.id) === 'true'
  data.id = event.id
  data.startDate = getDate(data.start_time)
  data.isEventDone = isEventDone(data.end_time)

  // const tagIds = []
  // if (event.relationships.tags.data) {
  //   event.relationships.tags.data.forEach((tag) => {
  //     tagIds.push(tag.id)
  //   })
  // }
  // if (event.relationships.location.data) {
  //   const location = _.find(locations, function (location) {
  //     return location.id === event.relationships.location.data.id
  //   })
  //   data.location = location.title
  //   data.locationId = location.id
  // }
  // data.tags = tagIds
  // data.theme = ''
  // if (event.relationships.themes.data) {
  //   data.theme = event.relationships.themes.data.id
  // }

  return data
}

function isEventDone (inputDate) {
  const now = new Date()
  const date = new Date(inputDate)
  return date < now
}
