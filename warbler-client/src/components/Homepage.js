import React from 'react';
import {Link} from 'react-router-dom';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const Homepage = ({currentUser}) => {
  document.title = 'Warbler';
  if(!currentUser.isAuthenticated) {
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
  return (
    <div className="row">
      <UserAside {...currentUser.user} />
      <div className="col-12 col-md-6">
        <MessageList />
      </div>
      {/* <MessageTimeline profileImgUrl={currentUser.user.profileImgUrl} username={currentUser.user.username}/> */}
    </div>
  );
};

export default Homepage;
