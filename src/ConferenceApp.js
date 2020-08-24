import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, useLocation } from 'react-router-dom'

function ScrollToTop () {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const ConferenceApp = {
  render: (config) => {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter {...config}>
          <ScrollToTop />
          <App {...config} />
        </BrowserRouter>
      </React.StrictMode>,
      config.element
    )
  }
}

export default ConferenceApp
