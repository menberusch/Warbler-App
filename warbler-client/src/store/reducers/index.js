import {combineReducers} from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';
import users from './users';

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  users
});

export default rootReducer;