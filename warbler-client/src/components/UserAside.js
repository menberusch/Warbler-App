import React from 'react';
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';
import {Link} from 'react-router-dom';

const UserAside = ({username, name, profileImgUrl, postsCount}) => {
  return(<aside className="col-12 col-md-4 p-0">
    <div className="card flex-row">
      <Link to={`/${username}`} >
        <img
        src={profileImgUrl || DefaultProfileImage} 
        alt={username}
        className="card-img-left rounded-circle"/>
      </Link>
      <Link to={`/${username}`} className="card-body align-self-end p-2">
          <div>{name}</div>
          <div className="lead">@{username}</div>
      </Link>
      <div>
        <Link to={`/${username}`} className="user-posts-icon">
          <span className="icon-messages"></span>
          <div className="user-posts-icon__count">{postsCount}</div>
        </Link>
      </div>
    </div>
  </aside>);
};

export default UserAside;