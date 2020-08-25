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
  // event.themes may be an object!
  if (data.themes && !Array.isArray(data.themes)) {
    data.themes = [data.themes]
  }

  // Build search string
  const searchItems = [
    data.title,
    data.description,
    data.location && data.location.title
  ]
  if (data.tags) {
    searchItems.push(data.tags.map(tag => tag.title))
  }
  if (data.themes) {
    searchItems.push(data.themes.map(theme => theme.title))
  }
  data.search =
    // Flatten
    [].concat(...searchItems)
      .filter(value => !!value)
      .join(' ')
    // Strip tags
      .replace(/(<([^>]+)>)/ig, '')
      .toLocaleLowerCase()

  return data
}

function isEventDone (inputDate) {
  const now = new Date()
  const date = new Date(inputDate)
  return date < now
}
