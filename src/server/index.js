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

app.get('/signup', (req, res) => {
  console.log('signup route')
  res.status(200).send(
    render(
      <div>signup to ssr services</div>
    )
  )
})

app.get('/', (req, res) => {
  const match = routes.reduce((acc, route) => matchPath(req.url, route, {exact: true}) || acc, null)
  if (!match) {
    res.status(404).send(render(<NoMatch />))
    return
  }

  // if (context.url) {
    // res.writeHead(301, {
    //   Location: context.url
    // })
    // res.end()
    // console.log('context:', context.url)
  // }

  console.log('foo')
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

app.listen(3000, () => console.log('app listening on port 3000'))
