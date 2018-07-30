import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem';
import {fetchUser} from '../store/actions/users';

class MessageList extends Component {

  render() {
    const {messages, user, removeMessage, currentUser, fetchUser} = this.props;

    const messageList = messages.map(m => (
      <MessageItem 
        key={m._id} 
        date={m.createAt}
        text={m.text}
        username={m.user.username ? m.user.username : user.username}
        profileImgUrl={m.user.profileImgUrl || !user ? m.user.profileImgUrl : user.profileImgUrl}
        removeMessage={()=>{
          removeMessage(m.user._id ? m.user._id : user._id, m._id);
          fetchUser(m.user.username ? m.user.username : user.username);
        }}
        isCurrentUser={m.user._id ? 
          currentUser.id === m.user._id 
          :
          currentUser.id === user._id}
      />
    ));

    return (
      <ul className="list-group w-100" id="messages">
        {messageList}
      </ul>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user
  };
};

export default connect(mapStateToProps, {removeMessage, fetchUser})(MessageList);