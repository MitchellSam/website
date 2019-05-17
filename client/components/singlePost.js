import React from 'react'

const SinglePost = props => {
    const post = props.selectedPost[0] || {title: 'title', content: 'content'}
    return (
        <div>
            <div>{post.title}</div>
            <div>{post.content}</div>
        </div>
    );
};

export default SinglePost;