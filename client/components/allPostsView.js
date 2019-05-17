import React, { Component } from 'react'
import { PostList } from '../components'

import { connect } from 'react-redux'
import { loadAllPosts } from '../store'

class AllPostsView extends Component {
  componentDidMount() {
    this.props.loadPosts()
  }

  render() {
    return (
      <div>
        <h2>AllPostsView</h2>
        <PostList {...this.props.post} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: () => dispatch(loadAllPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPostsView);
