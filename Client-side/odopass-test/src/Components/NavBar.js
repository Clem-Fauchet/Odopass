import React from 'react'

//Material UI
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'

const styles = (theme) => ({
	root: {},

	title: {
		marginRight: '2em',
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
	const { classes } = props
	const [auth, setAuth] = React.useState(true)

	const handleChange = (event) => {
		setAuth(event.target.checked)
	}

	return (
		<div className={classes.root}>
			<FormGroup>
				<FormControlLabel
					control={
						<Switch
							checked={auth}
							onChange={handleChange}
							aria-label='login switch'
						/>
					}
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
					>
						<MenuIcon />
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

export default withStyles(styles)(NavBar)
