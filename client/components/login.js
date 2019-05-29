import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getMe, loginUser, logoutUser } from '../store'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      // do nothing
    } else {
      this.props.submitLogin(this.state)
    }
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label> Username:
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="username" />
          </label>
          <label> Password:
            <input name="password" type="text" value={this.state.password} onChange={this.handleChange} placeholder="password" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.props.authMe}>AuthMe</button>
        <button onClick={this.props.submitLogout}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = function (dispatch) {
  return {
    authMe: function () {
      dispatch(getMe())
    },
    submitLogin: function (payload) {
      dispatch(loginUser(payload));
    },
    submitLogout: function () {
      dispatch(logoutUser())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);