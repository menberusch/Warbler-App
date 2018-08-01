import {combineReducers} from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import posts from './posts';
import users from './users';

// Location change update
// const changeLocation = (state=) => {
  
// }

const rootReducer = combineReducers({
  currentUser,
  errors,
  posts,
  users
  // changeLocation
});

export default rootReducer;