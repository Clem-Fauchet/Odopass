import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'

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

axios.defaults.baseUrl =
	'https://europe-west2-odopass-test.cloudfunctions.net/api'

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
							<Route exact path='/users/:username' component={UserProfile} />
							<Route exact path='/users' component={UsersList} />
						</Switch>
					</div>
				</Router>
			</div>
		</Provider>
	)
}

export default App
