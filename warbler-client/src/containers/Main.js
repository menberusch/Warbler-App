import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import withAuth from '../hocs/withAuth';
import withPosts from '../hocs/withPosts';

import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/errors';

import PostForm from './PostForm';
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
      <Route exact path="/" component={withPosts(Homepage)} />
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
      <Route path="/users/:id/posts/new" component={withAuth(PostForm)} />
      <Route path="/:username" component={withPosts(Profilepage, true)} />
    </Switch>
  </div>
);

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
};

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));