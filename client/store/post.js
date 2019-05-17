import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const SELECT_POST = 'SELECT_POST'
// const CREATE_POST = 'CREATE_POST'
// const UPDATE_POST = 'UPDATE_POST'
// const DELETE_POST = 'DELETE_POST'

// ACTION CREATORS
const getAllPosts = posts => ({
    type: GET_ALL_POSTS,
    allPosts: posts
})

const selectPost = (post) => ({ 
    type: SELECT_POST,
    selectedPost: post
})

// const createPost = (post) => ({ 
//     type: CREATE_POST,
//     createdPost: post
// })

// const updatePost = (post) => ({ 
//     type: UPDATE_POST,
//     updatedPost: post
// })

// const deletePost = (post) => ({ 
//     type: DELETE_POST,
//     deletedPost: post
// })

// THUNK CREATORS
export const loadAllPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch(getAllPosts(res.data || {} ))
    } catch (err) {
        console.error(err)
    }
}

export const loadSinglePost = (postId) => async dispatch => {
    try {
        const res = await axios.get('/api/posts/' + postId)
        dispatch(selectPost(res.data))
    } catch (err) {
        console.error(err)
    }
}

export const submitPost = (body) => async dispatch => {
    try {
        await axios.post('/api/posts', body)
        const res = await axios.get('/api/posts')
        dispatch(getAllPosts(res.data || {} ))
    } catch (err) {
        console.error(err)
    }
}

export const editPost = (postId, body) => async dispatch => {
    try {
        await axios.put('/api/posts/' + postId, body)
        const res = await axios.get('/api/posts')
        dispatch(getAllPosts(res.data || {} ))
    } catch (err) {
        console.error(err)
    }
}

export const removePost = (postId) => async dispatch => {
    try {
        await axios.delete('/api/posts/' + postId)
        const res = await axios.get('/api/posts')
        dispatch(getAllPosts(res.data || {} ))
    } catch (err) {
        console.error(err)
    }
}

// INITIAL STATE
const initialState = {
    allPosts: [],
    selectedPost: {}
}

// REDUCER
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return { ...state, allPosts: action.allPosts }
        case SELECT_POST:
            return { ...state, selectedPost: action.selectedPost }
        default:
            return state
    }
}