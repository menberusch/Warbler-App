import React from 'react';
import DefaultProfileImage from '../images/default-profile-image.jpg';

const UserAside = ({profileImgUrl, username}) => (
  <aside className="col-12 col-md-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img
          src={profileImgUrl || DefaultProfileImage} 
          alt={username}
          width="200"
          height="200"
          className="img-thumbnail"/>
      </div>
    </div>
  </aside>
);

export default UserAside;