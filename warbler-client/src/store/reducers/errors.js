import {ADD_ERROR, REMOVE_ERROR} from '../actionTypes';

export default (state = {post: null}, action) => {
  switch(action.type) {
    case ADD_ERROR:
      return {...state, post: action.error};
    case REMOVE_ERROR:
      return {...state, post: null};
    default:
      return state;
  }
}