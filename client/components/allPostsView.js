import React, { Component } from 'react'
import { PostList, CreatePost } from '../components'

import { connect } from 'react-redux'
import { loadAllPosts, removePost } from '../store'

class AllPostsView extends Component {
  componentDidMount() {
    this.props.loadPosts()
  }

  render() {
    return (
      <div>
        <h2>AllPostsView</h2>
        <PostList {...this.props} />
        <CreatePost />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: () => dispatch(loadAllPosts()),
  deletePost: (postId) => dispatch(removePost(postId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPostsView);
