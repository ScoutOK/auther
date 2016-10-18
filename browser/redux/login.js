import axios from 'axios';
import { browserHistory } from 'react-router';

const SET_CURRENT_USER = "SET_CURRENT_USER"
const LOGOUT_USER ="LOGOUT_USER"


//sync action creator
const currentUser = user => ({
  type: SET_CURRENT_USER,
  currentUser: user
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})

//reducer
export default function reducer (currentUser = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUser
    case LOGOUT_USER:
      return {};
    default:
      return currentUser
  }
}

//async action creator
export const loginUser = (email, password) => dispatch => {
  axios.post('api/login', {email: email, password: password})
  .then((user) => {
    browserHistory.push(`/users/${user.data.id}`);
    return dispatch(currentUser(user.data))
  })
  .catch (err => console.err('problem with logging in the user', err))
}

export const signupUser = (email, password) => dispatch => {
  axios.post('api/login/signup', {email: email, password: password})
  .then((user) => dispatch(currentUser(user.data)))
  .catch (err => console.err('problem with logging in the user', err))
}

