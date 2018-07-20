import React from 'react';
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';
import {Link} from 'react-router-dom';

const UserAside = ({profileImgUrl, username}) => (
  <aside className="col-12 col-md-4">
    <div className="card flex-row">
      <img
        src={profileImgUrl || DefaultProfileImage} 
        alt={username}
        className="card-img-left rounded-circle"/>
      <div className="card-body align-self-end p-2">
          <h5 className="card-title m-0">Vasyl Bryndas</h5>
          <span className="lead">@{username}</span>
      </div>
      <Link to="/" className="user-posts p-2">
        <span class="icon-messages"></span>
      </Link>
    </div>
  </aside>
);

export default UserAside;