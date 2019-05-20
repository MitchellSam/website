import React from 'react'

const SinglePost = props => {
    const post = props.post.selectedPost[0] || { title: 'title', content: 'content', id: 0 }
    return (
        <div>
            <div>{post.id}</div>
            <div>{post.title}</div>
            <div>{post.content}</div>
        </div>
    );
};

export default SinglePost;