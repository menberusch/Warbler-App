import React from 'react';
import {Link} from 'react-router-dom';
import PostList from '../containers/PostList';
import UserAside from './UserAside';

const Homepage = ({user, currentUser, allPosts, postsCount}) => {
  document.title = 'Warbler';

  if(currentUser && currentUser.isAuthenticated) {
    return (
      <div className="row">
        <UserAside {...user} currentUser={currentUser} postsCount={postsCount} />
        <div className="col-12 col-md-8 mt-2">
          <PostList posts={allPosts} />
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
}

export default Homepage;
