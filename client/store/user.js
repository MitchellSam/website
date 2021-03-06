import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// INITIAL STATE
const defaultUser = {}

// ACTION CREATORS
const getUser = user => ({
  type: GET_USER,
  user: user
})

const removeUser = () => ({
  type: REMOVE_USER
})

// THUNK CREATORS
export const getMe = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post('/auth/${method}', { email, password })
//   } catch (authError) {
//     return dispatch(getUser({ error: authError }))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/profile')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

export const loginUser = (body) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', body)
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    if (res) {
      dispatch(getUser(res.data))
      history.push('/profile')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logoutUser = () => async dispatch => {
  try {
    await axios.delete('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

export const signupUser = (body) => async dispatch => {

  try {
    await axios.post('/api/users', body)
  } catch (err) {
    console.error(err)
  }

  let res
  try {
    res = await axios.post('/auth/login', body)
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    if (res) {
      dispatch(getUser(res.data))
      history.push('/profile')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const editUser = (userId, body) => async dispatch => {
  try {
    await axios.put('/api/users/' + userId, body)
  } catch (err) {
    console.error(err)
  }

  try {
    await axios.post('/api/users', body)
  } catch (err) {
    console.error(err)
  }

  let res
  try {
    res = await axios.post('/auth/login', body)
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    if (res) {
      dispatch(getUser(res.data))
      history.push('/profile')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

// REDUCER
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}