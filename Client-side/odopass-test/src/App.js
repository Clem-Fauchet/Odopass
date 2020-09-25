import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'

//Style
import './App.scss'

//Pages
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserProfile from './Pages/UserProfile'
import UsersList from './Pages/UsersList'

//Components
import NavBar from './Components/NavBar'

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<Router>
					<NavBar />
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Login} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/profile-user' component={UserProfile} />
							<Route exact path='/users-list' component={UsersList} />
						</Switch>
					</div>
				</Router>
			</div>
		</Provider>
	)
}

export default App
