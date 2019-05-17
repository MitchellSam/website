import React, { Component } from 'react'
import { SinglePost } from '../components'

import { connect } from 'react-redux'
import { loadSinglePost } from '../store'

class SinglePostView extends Component {
  componentDidMount() {
    this.props.loadPost()
  }

  render() {
    return (
      <div>
        <h2>SinglePostView</h2>
        <SinglePost {...this.props.post} />
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostView);