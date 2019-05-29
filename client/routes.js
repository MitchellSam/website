import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {AllPostsView, SinglePostView, Login, SignUp, Profile} from './components'

class Routes extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={AllPostsView} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />

        <Route path="/posts/:postId" component={SinglePostView} />
      </Switch>
    )
  }
}

export default Routes