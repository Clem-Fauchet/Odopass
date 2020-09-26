import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

//redux
import { connect } from 'react-redux'
import store from '../redux/store'
import {  logoutUser } from '../redux/actions/userActions'

//Material UI
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ListIcon from '@material-ui/icons/List'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'

const styles = (theme) => ({
	root: {},

	title: {
		marginRight: '2em',
		fontSize: '1.1em',
	},

	userProfile: {
		position: 'absolute',
		right: '2em',
	},

	userProfileIcon: {
		fontSize: '2.1rem',
	},
})

function NavBar(props) {
	const { classes, authenticated } = props
	const [auth, setAuth] = useState(false)


	let history = useHistory()

	const handleChange = (e) => {

		setAuth(e.target.checked)
		store.dispatch(logoutUser())
		history.push('/')
}


	return (
		<div className={classes.root}>
			<FormGroup>
				<FormControlLabel
					control={
						<Switch
							checked={authenticated ? !auth : auth}
							onChange={authenticated ? handleChange : null}
							aria-label='login switch'
						/>
					}
					component={Link}
					to={authenticated ? '/profile-user' : '/'}
					label={auth ? 'Logout' : 'Login'}
				/>
			</FormGroup>

			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'
						component={Link}
						to='/users-list'
					>
						<ListIcon />
					</IconButton>

					<Typography variant='h6' className={classes.title}>
						Users List
					</Typography>

					{auth && (
						<div className={classes.userProfile}>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								color='inherit'
								component={Link}
								to='/profile-user'
							>
								<AccountCircleIcon className={classes.userProfileIcon} />
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	)
}

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
})

const mapActionsToProps = {
	logoutUser,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(NavBar))
