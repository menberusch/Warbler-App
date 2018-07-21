import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeline = props => {
  const profilepage = props.profilepage ? true : false;
  return (
    <div className="row">
      <UserAside 
        profileImgUrl={props.profileImgUrl}
        username={props.username}
      />
      <MessageList profilepage={profilepage}/>
    </div>
  )
};

export default MessageTimeline;