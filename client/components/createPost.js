/* eslint-disable react/button-has-type */
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { submitPost } from '../store'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
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
        console.log('created post: ', this.state)
        this.props.createPost(this.state)
    }

    render() {
        return (
            <div>
                <h2>CreatePost</h2>
                <form onSubmit={this.handleSubmit}>
                    <label> Title: 
                        <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                    </label>
                    <label> Content: 
                        <input name="content" type="text" value={this.state.content} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        createPost: function (payload) {
            dispatch(submitPost(payload));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreatePost);