import React, { useState, useEffect } from 'react'
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

	customError: {
		color: 'red',
		fontSize: '0.9rem',
		marginTop: '15px',
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

	const { errors, loading } = state

	//submitting form

	const handleSubmit = (e) => {
		//submit form
		e.preventDefault()
		setState({ loading: true })

		const userData = {
			email: state.email,
			password: state.password,
		}
		axios
			.post('/login', userData)
			.then((res) => {
				console.log(res.data)
				setState({ loading: false })
				props.history.push('/profile-user')
			})
			.catch((err) => {
				setState({ errors: err.response.data, loading: false })
			})
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
						// helperText={state.errors.email}
						// error={state.errors.email ? true : false}
						value={state.email || ''}
						onChange={handleChange}
						fullWidth
					></TextField>

					<TextField
						id='password'
						name='password'
						label='Password'
						className={classes.textField}
						// helperText={state.errors.password}
						// error={state.errors.password ? true : false}
						value={state.password || ''}
						onChange={handleChange}
						fullWidth
					></TextField>

					{/* {errors.general && (
						<Typography variant='body2' className={classes.customError}>
							{errors.general}
						</Typography>
					)} */}

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
