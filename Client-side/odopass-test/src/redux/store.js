import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import dataActions from './actions/dataActions'
import uiReducer from './reducers/uiReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
	user: userReducer, //store inside state user
	data: dataActions,
	UI: uiReducer,
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
