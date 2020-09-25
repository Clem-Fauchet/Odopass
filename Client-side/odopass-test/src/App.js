import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Style
import './App.scss'

//Pages
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserProfile from './Pages/UserProfile'
import UsersList from './Pages/UsersList'

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/profile-user' component={UserProfile} />
					<Route exact path='/users-list' component={UsersList} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
