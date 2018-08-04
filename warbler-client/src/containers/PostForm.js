import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newPost} from '../store/actions/posts';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    };
  };

  handleNewPost = e => {
    e.preventDefault();
    this.props.newPost(this.state.post);
    this.setState({post: ''});
    this.props.history.push('/');
  };

  render() {
    return(
      <form onSubmit={this.handleNewPost} className="clearfix">
        {this.props.errors.post && (
          <div className="alert alert-danger">
            {this.props.errors}
          </div>
        )}
        <input 
          type="text" 
          className="form-control" 
          value={this.state.post}
          onChange={e => this.setState({post: e.target.value})}
        />
        <button type="submit" className="btn btn-success float-right">
          Send post.
        </button>
      </form>
    )
  }
};

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, {newPost})(PostForm);