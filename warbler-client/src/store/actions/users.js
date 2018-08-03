import {apiCall} from '../../services/api';
import {addError} from './errors';
import {GET_USER} from '../actionTypes';

export const getUser = user => ({
  type: GET_USER,
  user
});

export const fetchUser = username => {
  return dispatch => (
    apiCall('get', `/api/users/${username}`)
      .then(data => dispatch(getUser(data)))
      .catch(err => dispatch(addError(err)))  
  );
};

export const fetchUsers = () => {
  return 
}

export const updateUser = () => {
  return dispatch => (
    apiCall('put', `/api/users/${username}/update`)
  )
}