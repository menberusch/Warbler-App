import {GET_USER} from '../actionTypes';

const users = (state=false, action) => {
  switch(action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  };
};

export default users;