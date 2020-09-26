import {
  SET_LIST, SET_USER
} from '../types'
import axios from 'axios'

//Get all users
export const getUsersList = () => (dispatch) => {
  axios.get('/users')
  .then((res) => {
    dispatch({
      type: SET_LIST,
      payload: res.data
    })
  })

  .catch((err) => {
    dispatch({
      type: SET_LIST,
      payload: []
    })
  })
}