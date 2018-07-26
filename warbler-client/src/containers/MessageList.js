import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessages, removeMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem';

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  render() {
    const {messages, removeMessage, user, currentUser, profilepage} = this.props;
    let messagesCopy;

    if(profilepage) 
      messagesCopy = messages.filter(m => m.user.username === user.username) 
    else 
      messagesCopy = messages.slice();

    let messageList = messagesCopy.map(m => (
      <MessageItem 
        key={m._id} 
        date={m.createAt}
        text={m.text}
        username={m.user.username}
        profileImgUrl={m.user.profileImgUrl}
        removeMessage={removeMessage.bind(this, m._id)}
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