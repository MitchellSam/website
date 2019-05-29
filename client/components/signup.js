import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getMe, signupUser, logoutUser } from '../store'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: ''
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
      this.props.submitSignup(this.state)
    }
  }

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <label> Username:
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="username" />
          </label>
          <label> Password:
            <input name="password" type="text" value={this.state.password} onChange={this.handleChange} placeholder="password" />
          </label>
          <label> First Name:
            <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} placeholder="firstName" />
          </label>
          <label> Last Name:
            <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} placeholder="lastName" />
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
    submitSignup: function (payload) {
      dispatch(signupUser(payload));
    },
    submitLogout: function () {
      dispatch(logoutUser())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);