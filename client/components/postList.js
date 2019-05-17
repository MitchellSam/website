import React from 'react'
import { Link } from 'react-router-dom'

const PostList = props => {
    const posts = props.allPosts || []
    return (
        <ul>
            {posts.map(post => (
                <div
                    key={post.id}
                    id={post.id}
                    // onClick={() => console.log('clicked on post: ',post)}
                >
                    <Link to={'/posts/' + post.id}>{post.title}</Link>
                </div>
            ))}
        </ul>
    );
};

export default PostList;