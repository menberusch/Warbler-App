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
    apiCall('get', `/api/users/user/${username}`)
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

export const updateUser = (user_id, user_obj) => {
  return dispatch => (
    apiCall('patch', `/api/users/user/${user_id}/update`, user_obj)
      .then(user => dispatch(currentUser(user)))
      .catch(err => dispatch(addError(err)))
  );
};