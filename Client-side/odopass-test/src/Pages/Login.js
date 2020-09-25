import React, { useState } from 'react'
import axios from 'axios'

//Material UI
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
	form: {
		textAlign: 'center',
		padding: '0.5em',
		marginTop: '20px',
		display: 'flex',
	},

	textField: {
		margin: '15px auto 25px',
	},

	submitButton: {
		marginTop: '2em',
	},
}

function Login(props) {
	const { classes } = props

	const [state, setState] = useState({
		email: '',
		password: '',
		loading: false,
		errors: {},
	})

	const handleSubmit = (e) => {
		//submit form
		e.preventDefault()
		setState({ loading: true })
	}

	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value }) //changing input with value
	}

	return (
		<Grid container className={classes.form}>
			<Grid item sm={3} />
			<Grid item sm>
				<Typography variant='h4' className={classes.pageTitle}>
					Login
				</Typography>

				<form noValidate onSubmit={handleSubmit}>
					<TextField
						id='email'
						name='email'
						label='Email'
						className={classes.textField}
						value={state.email}
						onChange={handleChange}
						fullWidth
					></TextField>

					<TextField
						id='password'
						name='password'
						label='Password'
						className={classes.textField}
						value={state.password}
						onChange={handleChange}
						fullWidth
					></TextField>

					<Button
						variant='contained'
						color='primary'
						className={classes.submitButton}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</form>
			</Grid>
			<Grid item sm={3} />
		</Grid>
	)
}

export default withStyles(styles)(Login)
