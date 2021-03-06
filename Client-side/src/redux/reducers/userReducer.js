import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types'

const initialState = {
	authenticated: false,
	loading: false,
	profile: {}, //user details
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			}

		case SET_UNAUTHENTICATED: //logout
			return {
				...state,
				authenticated: false,
			}

		case SET_USER:
			return {
				...state,
				loading: false,
				...action.payload, //bind the details user to information
			}

		default:
			return state
	}
}
