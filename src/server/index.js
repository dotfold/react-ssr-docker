/* eslint-disable no-console */

import express from 'express'
import React from 'react'
import App from '../shared/App'
import NoMatch from '../shared/NoMatch'
import {StaticRouter as Router, matchPath} from 'react-router'
import sourceMapSupport from 'source-map-support'
import render from './render'

const routes = [
  '/',
]

sourceMapSupport.install()

const app = express()
app.use('/static', express.static('./dist'))

app.get('*', (req, res) => {
  console.log('match route')
  const match = routes.reduce((acc, route) => matchPath(req.url, route, {exact: true}) || acc, null)
  console.log('match?', match)
  if (!match) {
    res.status(404).send(render(<NoMatch />))
    return
  }

  res.status(200).send(
    render(
      (
        <Router context={{}} location={req.url}>
          <App />
        </Router>
      )
    )
  )
})

app.listen(3000, () => console.log('Demo app listening on port 3000'))