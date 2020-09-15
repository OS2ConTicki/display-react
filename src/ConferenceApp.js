import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, useLocation } from 'react-router-dom'

function ScrollToTop () {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    const element = hash && document.querySelector(hash)
    if (element) {
      // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

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
