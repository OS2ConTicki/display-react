import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'font-awesome/css/font-awesome.css'
import { BrowserRouter } from 'react-router-dom'

const Conference = {
  render: (config) => {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App {...config} />{' '}
        </BrowserRouter>
      </React.StrictMode>,
      config.element
    )
  }
}

export default Conference
