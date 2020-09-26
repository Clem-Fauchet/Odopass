import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Redux
import {connect} from 'react-redux'
import {getUserDetails} from '../redux/actions/userActions'

//Material UI
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

const styles = () => ({})

function UserProfile(userData) {
	const [state, setState] = useState({
   profile: null
	})

	useEffect(() => {
		const username = userData.match.params.username
		userData.getUserDetails(username)

		axios
		.get(`/user/${username}`)
		.then((res) => {
			setState({profile: res.data.user})
		})
		.catch((err) => console.error(err))
	}, []) // eslint-disable-line react-hooks/exhaustive-deps



	return <div>userProfile</div>
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps, {getUserDetails})(withStyles(styles)(UserProfile))
