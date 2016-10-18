import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import currentUser from './login'

export default combineReducers({ users, stories, currentUser });
