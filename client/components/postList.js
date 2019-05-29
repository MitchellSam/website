/* eslint-disable react/button-has-type */
import React from 'react'
import { Link } from 'react-router-dom'

const PostList = props => {
    const posts = props.post.allPosts || []
    const deletePost = props.deletePost
    return (
        <ul>
            {posts.map(post => (
                <div
                    key={post.id}
                    id={post.id}
                >
                    <Link to={'/posts/' + post.id}>{post.title}</Link>
                    <button onClick={() => {
                        deletePost(post.id)
                    }}>delete</button>
                </div>
            ))}
        </ul>
    );
};

export default PostList;