import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import DefaultProfileImg from '../assets/images/default-profile-image.jpg';

const PostItem = ({date, profileImgUrl, text, username, removePost, isCurrentUser}) => (
  <div>
    <li className="list-group-item">
      <img 
        src={profileImgUrl || DefaultProfileImg} 
        alt="username" height="100" width="100" 
        className="timeline-image" 
      />
      <div className="post-area">
        <Link to={`/${username}`}>@{username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        <p>{text}</p>
      </div>
      {isCurrentUser && (
        <button type="button" className="btn btn-danger" onClick={removePost}>X</button>
      )}   
    </li>
  </div>
);

export default PostItem;