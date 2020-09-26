import { SET_LIST } from '../types'

const initialState = {
	lists: [], //list users
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_LIST: {
			return {
				...state,
				lists: action.payload,
			}
		}

		default:
			return state
	}
}
