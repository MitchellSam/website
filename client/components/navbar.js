import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
    <div>
        <Link to="/">
            <h1>WEBSITE</h1>
        </Link>
        <nav>
            {isLoggedIn ? (
                <div>
                    <a href="#" onClick={handleClick}>
                        Logout
                    </a>
                </div>
            ) : (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                )
            }
        </nav>
        <hr />
    </div>
)

const mapState = state => {
    return {
        isLoggedIn: !!state.user.id
    }
}

const mapDispatch = dispatch => {
    return {
        handleClick() {
            dispatch(logout())
        }
    }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}


// const Navbar = () => {
//     return (
//         <nav>
//             <Link to="/">Home</Link>
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>

//             <Link to="/allPostsView">allPostsView</Link>
//             <Link to="/singlePostView">singlePostView</Link>
//         </nav>
//     )
// }

// export default Navbar