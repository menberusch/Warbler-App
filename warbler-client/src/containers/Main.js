import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import withAuth from '../hocs/withAuth';
import withMessages from '../hocs/withMessages';

import {authUser} from '../store/actions/auth';

import MessageForm from './MessageForm';
import Settings from './Settings';

import AuthForm from '../components/AuthForm';
import Homepage from '../components/Homepage';
import Profilepage from '../components/Profilepage';

const Main = ({
  authUser, 
  errors, 
  removeError
}) => (
  <div className="container">
    <Switch>
      <Route exact path="/" component={withMessages(Homepage)} />
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
      <Route path="/settings" component={withAuth(Settings)} />
      <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
      <Route path="/:username" component={withMessages(Profilepage, true)} />
    </Switch>
  </div>
);

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
};

export default withRouter(connect(mapStateToProps, {authUser})(Main));