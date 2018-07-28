import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

class Homepage extends Component {
  render() {
    const {user, isAuthenticated, allMessages} = this.props;
    document.title = 'Warbler';

    if(isAuthenticated) {
      return (
        <div className="row">
          <UserAside {...user} />
          <div className="col-12 col-md-6">
            <MessageList messages={allMessages} />
          </div>
        </div>
      );
    };
    
    return (
      <div className="home-hero">
        <h1>What's up?</h1>
        <h4>New to Warbler?</h4>
        <Link to="signup" className="btn btn-primary">
          Sign up, here!
        </Link>
      </div>
    );
  };
}

export default Homepage;
