import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import 'whatwg-fetch'

import App from '../shared/App'

render((
  <Router>
    <App />
  </Router>
), document.getElementById('app'))
