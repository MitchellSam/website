import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../store'

const Navbar = ({ isLoggedIn, submitLogout }) => {
    return (
        <nav>
            <Link to="/">
                <h1>WEBSITE</h1>
            </Link>

            {/* {!isLoggedIn ? (
                <div>
                    <Link to="/login">Log In</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>) : (
                <div>
                    <Link to="/profile">Profile</Link>
                    <a href="#" onClick={submitLogout}>Log Out</a>
                </div>)
            } */}

            {!isLoggedIn ? <Link to="/login">Log In</Link> : null}
            {!isLoggedIn ? <Link to="/signup">Sign Up</Link> : null}
            {isLoggedIn ? <Link to="/profile">Profile</Link> : null}
            {isLoggedIn ? <a href="#" onClick={submitLogout}>Log Out</a> : null}

        </nav>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitLogout() {
            dispatch(logoutUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)