import React from 'react'
import { Link } from 'react-router-dom'

// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {logout} from '../store'

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>

            <Link to="/allPostsView">allPostsView</Link>
            <Link to="/singlePostView">singlePostView</Link>
        </nav>
    )
}

export default Navbar