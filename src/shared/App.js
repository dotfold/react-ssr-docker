import React from 'react'
import Main from './Main'
import Home from './Home'
import {Link, Route} from 'react-router-dom'

const style = {
  display: 'flex',
  alignItems: 'stretch'
}

export default () => (
  <div style={style}>
    <Main>
      <Route path="/" exact component={Home} />
    </Main>
  </div>
)

