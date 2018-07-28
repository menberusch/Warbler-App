import {combineReducers} from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';
import users from './users';

// Location change update
// const changeLocation = (state=) => {
  
// }

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  users
  // changeLocation
});

export default rootReducer;