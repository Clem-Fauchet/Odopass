import {
	SET_USER,
	SET_ERRORS,
	LOADING_UI,
	CLEAR_ERRORS,
	SET_UNAUTHENTICATED,
} from '../types'
import axios from 'axios'

//Access authorization
const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`
	localStorage.setItem('FBIdToken', `Bearer ${FBIdToken}`) //store identification token in application

	axios.defaults.headers.common['Authorization'] = FBIdToken
}

//Login user
export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI })

	axios
		.post('/login', userData)
		.then((res) => {
			setAuthorizationHeader(res.data.token)
			dispatch(getUserDetails())
			dispatch({ type: CLEAR_ERRORS })
			history.push(`/users`)

		})

		.catch((err) => {
			console.log(err.response.data)
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		})
}

//Get User Information
export const getUserDetails = (username) => (dispatch) => {
	axios
		.get(`/user/${username}`)
		.then((res) => {
			dispatch({
				type: SET_USER,
				payload: res.data,
			})
		})
		.catch((err) => console.log('failed getting user details'))
}

//Register User
export const registerUser = (newUserData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI }) //dispatch action loading

	axios
		.post('/register', newUserData)
		.then((res) => {
			setAuthorizationHeader(res.data.token)
			dispatch(getUserDetails())
			dispatch({ type: CLEAR_ERRORS })
			history.push(`/users`)
		})

		.catch((err) => {
			console.log(err.response.data)
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		})
}

//Logout User
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('FBIdToken') //remove token
	delete axios.defaults.headers.common['Authorization'] //delete the entry
	dispatch({ type: SET_UNAUTHENTICATED })
}

