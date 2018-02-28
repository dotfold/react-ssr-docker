import React from 'react'
import Main from './Main'
import Home from './Home'
import {Link, Route, Redirect} from 'react-router-dom'

const style = {
  display: 'flex',
  alignItems: 'stretch'
}

const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext)
      staticContext.status = status
    return <Redirect from={from} to={to}/>
  }}/>
)

const Another = () => <div>another route</div>
const Layout = ({component: Component, ...rest}: LayoutComponentProps) => {
  return (
    <Route {...rest} render={matchProps => (
      <div>
        <Component {...matchProps} />
      </div>
    )} />
  )
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {redirectToSignup: false}
  }

  navigate = () => {
    this.setState({redirectToSignup: true})
  }

  render () {
    if (this.state.redirectToSignup) return <Redirect push={true} to="/signup" />
    return (
      <div style={style}>
        <Main>
          <Route path="/" exact component={Home} />
          <Layout path='/another' component={Another} />
        </Main>
        <Link to="/another">another</Link>
        <Link to="/signup">link to signup</Link>
        <a href="/signup">href to signup</a>
        <button onClick={this.navigate}>SIGNUP PAGE</button>
      </div>
    )
  }
}

// <RedirectWithStatus from="/" to="/signup" status={302} />

