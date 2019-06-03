import React, {Component} from 'react'

import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {AllPostsView, SinglePostView, Login, SignUp, Profile} from './components'

import {getMe} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        <Route exact path="/" component={AllPostsView} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        
        {isLoggedIn ? (
          <Switch>
            <Route path="/profile" component={Profile} />
          </Switch>
        ) : null }

        <Route path="/posts/:postId" component={SinglePostView} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getMe())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))