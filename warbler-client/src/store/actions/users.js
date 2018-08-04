import {apiCall} from '../../services/api';
import {addError} from './errors';
import {GET_USER, GET_USERS} from '../actionTypes';
import currentUser from '../reducers/currentUser';

export const getUser = user => ({
  type: GET_USER,
  user
});

export const getUsers = users => ({
  type: GET_USERS,
  users
});

export const fetchUser = username => {
  return dispatch => (
    apiCall('get', `/api/users/${username}`)
      .then(user => dispatch(getUser(user)))
      .catch(err => dispatch(addError(err)))  
  );
};

export const fetchUsers = () => {
  return dispatch => (
    apiCall('get', '/api/users/')
      .then(users => dispatch(getUsers(users)))
      .catch(err => dispatch(addError(err)))
  );
};

export const updateUser = (user_id) => {
  return dispatch => (
    apiCall('patch', `/api/users/${user_id}/update`)
      .then(user => dispatch(currentUser(user)))
      .catch(err => dispatch(addError(err)))
  );
};