/** @jsx jsx */

import React, { Component } from 'react'

import { jsx } from '@emotion/core'
import { containerSize, contentSize } from '../breakingPoints'

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
        <h2 css={styles.test}>AllPostsView</h2>
        <PostList {...this.props} />
        <CreatePost />
      </div>
    )
  }
}

const styles = {
  test: {
    // 320
    [`@media (min-width: ${containerSize.sm})`]: {
      backgroundColor: '#FF0000',
    },
    // 768
    [`@media (min-width: ${containerSize.md})`]: {
      backgroundColor: '#00FF00',
    },
    // 1024
    [`@media (min-width: ${containerSize.lg})`]: {
      backgroundColor: '#0000FF',
    },
    //1280
    [`@media (min-width: ${containerSize.xl})`]: {
      backgroundColor: '#FFFFFF',
    },
  },
  test2: {
    textDecoration: 'underline'
  }
};

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
