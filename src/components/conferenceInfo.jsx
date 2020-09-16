import React, { useContext, useState, useEffect } from 'react'
import DisplayInfoComponent from './common/displayInfoComponent'
import AppStateContext from '../context/appStateContext'

function ConferenceInfo () {
  const context = useContext(AppStateContext)
  const [conference, setConference] = useState()
  useEffect(() => {
    setConference(context.conference.get)
  })
  return (
    <>
      {conference && (
        <DisplayInfoComponent {...conference} />
      )}
    </>
  )
}

export default ConferenceInfo
