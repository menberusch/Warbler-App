import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessages, removeMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem';

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  render() {
    const {messages, removeMessage, currentUser} = this.props;
    let messageList = messages.map(m => (
      <MessageItem 
        key={m._id} 
        date={m.createAt}
        text={m.text}
        username={m.user.username}
        profileImgUrl={m.user.profileImgUrl}
        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
        isCurrentUser={currentUser === m.user._id}
      />
    ));
    return (
      <div className="row col-12 col-md-6">
          <ul className="list-group w-100" id="messages">
            {messageList}
          </ul>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user.id
  };
};

export default connect(mapStateToProps, {fetchMessages, removeMessage})(MessageList);