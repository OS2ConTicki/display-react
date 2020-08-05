import React, { useEffect, useState, useContext } from 'react'
import DisplayInfoComponent from './common/displayInfoComponent'
import AppStateContext from '../context/appStateContext'
import _ from 'lodash'

function EntityMapper (props) {
  const context = useContext(AppStateContext)
  const [entity, setEntity] = useState()
  useEffect(() => {
    const entityId = props.match.params.id
    let entities = []
    const type = props.match.path
    if (type.indexOf('speaker') > -1) {
      entities = context.speakers.get
    } else if (type.indexOf('organizer') > -1) {
      entities = context.organizers.get
    } else if (type.indexOf('sponsor') > -1) {
      entities = context.sponsors.get
    } else if (type.indexOf('event') > -1) {
      entities = context.events.get
    }

    if (entities) {
      const entityToSave = _.find(entities, function (entity) {
        return entity.id === entityId
      })
      setEntity(entityToSave)
    }
  })
  return (
    <>
      {entity && (
        <DisplayInfoComponent
          title={entity.title}
          description={entity.description}
          image={entity.image}
          ticketUrl={entity.ticketUrl}
        />
      )}
    </>
  )
}

export default EntityMapper
