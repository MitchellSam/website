/* eslint-disable react/button-has-type */
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { editUser } from '../store'

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: ''
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
      this.props.updateUser(this.props.userId, this.state)
      // this.props.history.push('/')
    }
  }

  render() {
    return (
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <label> Username:
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="username" />
          </label>
          <label> Password:
            <input name="password" type="text" value={this.state.password} onChange={this.handleChange} placeholder="password" />
          </label>
          <label> First Name:
            <input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} placeholder="firstname" />
          </label>
          <label> Last Name:
            <input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} placeholder="lastname" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id || null
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    updateUser: function (userId, payload) {
      dispatch(editUser(userId, payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);