import {
	SET_USER,
	SET_LIST,
	SET_ERRORS,
	LOADING_UI,
	CLEAR_ERRORS,
} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI }) //dispatch action loading

	axios
		.post('/login', userData)
		.then((res) => {
			console.log(res.data)

			localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`) //store identification token in application

			const FBIdToken = `Bearer ${res.data.token}`
			axios.defaults.headers.common['Authorization'] = FBIdToken

			dispatch(getUserDetails())
			dispatch({ type: CLEAR_ERRORS })
			history.push('/profile-user')
		})

		.catch((err) => {
			console.log(err.response.data)
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		})
}

export const getUserDetails = () => (dispatch) => {
	axios
		.get('/user')
		.then((res) => {
			dispatch({
				type: SET_USER,
				payload: res.data,
			})
		})
		.catch((err) => console.log(err))
}
