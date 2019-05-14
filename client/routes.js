import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {AllPostsView, SinglePostView} from './components'

class Routes extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={AllPostsView} />
        <Route path="/singlePostView" component={SinglePostView} />
      </Switch>
    )
  }
}

export default Routes