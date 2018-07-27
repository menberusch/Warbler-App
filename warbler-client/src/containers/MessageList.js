import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessages, removeMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem';

class MessageList extends Component {
  componentDidMount() {
    if(!this.props.userProfile) {
      this.props.fetchMessages();
    }
  }
  render() {
    const {messages, userProfile, removeMessage, currentUser} = this.props;
    let messageList;
    if(userProfile) 
      messageList = userProfile.messages.map(m => (
        <MessageItem 
          key={m._id} 
          date={m.createAt}
          text={m.text}
          username={userProfile.username}
          profileImgUrl={userProfile.profileImgUrl}
          removeMessage={removeMessage.bind(this, m.user, m._id)}
          isCurrentUser={currentUser.id === m.user}
        />
      )); 
    else 
      messageList = messages.map(m => (
        <MessageItem 
          key={m._id} 
          date={m.createAt}
          text={m.text}
          username={m.user.username}
          profileImgUrl={m.user.profileImgUrl}
          removeMessage={removeMessage.bind(this, m.user._id, m._id)}
          isCurrentUser={currentUser.id === m.user._id}
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
    messages: state.messages,
    currentUser: state.currentUser.user
  };
};

export default connect(mapStateToProps, {fetchMessages, removeMessage})(MessageList);