/* eslint-disable react/button-has-type */
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { editPost } from '../store'

class EditPost extends Component {
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
        if(this.state.title === '' || this.state.content === '') {
            // do nothing
        } else {
            this.props.changePost(this.props.post.selectedPost[0].id, this.state)
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <h2>EditPost</h2>
                <form onSubmit={this.handleSubmit}>
                    <label> Title: 
                        <input name="title" type="text" value={this.state.title} onChange={this.handleChange} placeholder="title"/>
                    </label>
                    <label> Content: 
                        <input name="content" type="text" value={this.state.content} onChange={this.handleChange} placeholder="content"/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        changePost: function (postId, payload) {
            dispatch(editPost(postId, payload));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditPost);