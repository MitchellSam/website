/* eslint-disable react/button-has-type */
import React, { Component } from 'react'
import { SinglePost, EditPost } from '../components'

import { connect } from 'react-redux'
import { loadSinglePost, removePost} from '../store'

class SinglePostView extends Component {
  componentDidMount() {
    this.props.loadPost()
  }

  render() {
    const selectedPost = this.props.post.selectedPost
    return (
      <div>
        <h2>SinglePostView</h2>
        <SinglePost {...this.props} />
        <EditPost {...this.props}/>
        <button onClick={() => {
          this.props.deletePost(selectedPost[0].id)
          this.props.history.push('/')
        }}>delete</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    loadPost: function () {
      const postId = Number(ownProps.match.params.postId);
      dispatch(loadSinglePost(postId));
    },
    deletePost: (postId) => dispatch(removePost(postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostView);