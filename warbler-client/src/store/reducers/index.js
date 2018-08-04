import {combineReducers} from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import posts from './posts';
import users from './users';


const rootReducer = combineReducers({
  currentUser,
  errors,
  posts,
  users
});

export default rootReducer;