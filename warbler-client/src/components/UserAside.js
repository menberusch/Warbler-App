import React from 'react';
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';
import {Link} from 'react-router-dom';

const UserAside = ({username, profileImgUrl, messages}) => {
  return(<aside className="col-12 col-md-4 p-0">
    <div className="card flex-row">
      <Link to={`/${username}`} >
        <img
        src={profileImgUrl || DefaultProfileImage} 
        alt={username}
        className="card-img-left rounded-circle"/>
      </Link>
      <Link to="/" className="user-posts p-2">
        <span className="icon-messages"></span>
        {messages.length}
      </Link>
      <div className="card-body align-self-end p-2">
          <span className="lead">@{username}</span>
      </div>
    </div>
  </aside>);
};

export default UserAside;