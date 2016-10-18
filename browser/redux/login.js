import axios from 'axios';

const SET_CURRENT_USER = "SET_CURRENT_USER"

//sync action creator
const currentUser = user => ({
  type: SET_CURRENT_USER,
  currentUser: user
})

//reducer
export default function reducer (currentUser = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUser
    default:
      return currentUser
  }
}

//async action creator
export const loginUser = (email, password) => dispatch => {
  axios.post('api/login', {email: email, password: password})
  .then((user) => dispatch(currentUser(user)))
  .catch (err => console.err('problem with logging in the user', err))
}
