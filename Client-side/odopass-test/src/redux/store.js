import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
	user: userReducer, //store inside user
})

const store = createStore(
	reducers,
	initialState,
	compose(
		//Devtools chrome
		applyMiddleware(...middleware),
		...(window.__REDUX_DEVTOOLS_EXTENSION__
			? [window.__REDUX_DEVTOOLS_EXTENSION__()]
			: [])
	)
)

export default store
