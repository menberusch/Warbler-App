import {apiCall} from '../../services/api';
import {addError} from './errors';
import {GET_USER, GET_USERS} from '../actionTypes';
import {setAuthorizationToken, setCurrentUser} from './auth';

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
      .then(({token, ...user}) => {
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(user))
      })
      .catch(err => dispatch(addError(err)))
  );
};

export const uploadProfileImg = (prevImage, image, imageName, user_id) => {
  return dispatch => (
    apiCall('post', `/api/users/user/${user_id}/upload_image`, {prevImage, image, imageName})
      .then(({imagePath}) => {
        return imagePath;
      })
      .catch(err => dispatch(addError(err)))
  );
}