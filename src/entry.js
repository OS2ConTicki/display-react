// https://www.npmjs.com/package/react-app-polyfill
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import './entry.scss'
import ConferenceApp from './ConferenceApp'

require('typeface-roboto')

window.ConferenceApp = ConferenceApp
