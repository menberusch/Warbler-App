import {GET_USER, GET_USERS} from '../actionTypes';

const users = (state={}, action) => {
  switch(action.type) {
    case GET_USER:
      return action.user;
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};

export default users;