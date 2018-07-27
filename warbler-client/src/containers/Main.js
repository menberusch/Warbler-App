import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import withAuth from '../hocs/withAuth';

import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/errors';
import {fetchMessages} from '../store/actions/messages';
import {fetchUser} from '../store/actions/users';

import MessageForm from './MessageForm';
import Profilepage from './Profilepage';

import AuthForm from '../components/AuthForm';
import Homepage from '../components/Homepage';

const Main = ({
  authUser, 
  errors, 
  removeError, 
  currentUser, 
  fetchMessages, 
  fetchUser,
  messages
}) => (
  <div className="container">
    <Switch>
      <Route exact path="/" render={props => (
        <Homepage 
          fetchMessages={fetchMessages}
          messages={messages}
          currentUser={currentUser} 
          {...props} 
        />
      )} />
      <Route exact path="/signin" render={props => (
        <AuthForm 
          onAuth={authUser} 
          {...props} 
          buttonText="Log in" 
          heading="Welcome Back."
          errors={errors}
          removeError={removeError}
        />
      )} />
      <Route exact path="/signup" render={props => (
        <AuthForm 
          onAuth={authUser} 
          {...props} 
          signUp 
          buttonText="Sign me up!" 
          heading="Join Warbler today."
          errors={errors}
          removeError={removeError}
        />
      )} />
      <Route path="/:username" render={props => (
        <Profilepage 
          fetchUser={fetchUser}
          currentUser={currentUser}
          {...props} 
        />
      )} />
      <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
    </Switch>
  </div>
);

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    user: state.user,
    messages: state.messages,
    errors: state.errors
  };
};

export default withRouter(connect(mapStateToProps, {
  authUser, removeError, fetchMessages, fetchUser
})(Main));