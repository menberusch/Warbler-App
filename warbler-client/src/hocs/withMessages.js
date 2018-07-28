import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessages} from '../store/actions/messages';
import {fetchUser} from '../store/actions/users';

export default function withMessages(ComponentToBeRendered, profilepage=false) {
  class MessagesProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      }
    }

    async componentDidMount() {
      const {fetchUser, fetchMessages, currentUser, match} = this.props;
      
      if(profilepage) {
        await fetchUser(match.params.username);
        document.title = `@${this.props.user.username} | Warbler`;
        this.setState({isLoading: false});
        
      } else if(currentUser.isAuthenticated){
        await fetchMessages();
        await fetchUser(currentUser.user.username);
        this.setState({isLoading: false});

      } else {
        this.setState({isLoading: false});
      }      
    };

    loadedProps = () => {
      const {currentUser, user, messages} = this.props;

      if(currentUser.isAuthenticated) {
        return profilepage ? {
          user: user,
          userMessages: user.messages
        } : {
          isAuthenticated: currentUser.isAuthenticated,
          user: user,
          allMessages: messages
        };
      } else {
        return {currentUser}
      }
    }

    componentWillUnmount() {
      this.setState({isLoading: true});
    };

    render() {
      const {isLoading} = this.state;
      let componentProps;

      if(!isLoading) componentProps = this.loadedProps();
      console.log(componentProps);
      return(
        <div>
          {isLoading ? (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <ComponentToBeRendered 
              {...componentProps} 
            />
          )}
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      messages: state.messages,
      user: state.users
    }
  }

  return connect(mapStateToProps, {fetchUser, fetchMessages})(MessagesProvider);
}