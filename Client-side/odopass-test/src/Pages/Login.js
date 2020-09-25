import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//Material UI
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = () => ({
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
		position: 'relative',
	},

	customError: {
		color: 'red',
		fontSize: '0.9rem',
		marginTop: '15px',
	},

	register: {
		marginTop: '1.5em',
	},

	circularProgress: {
		position: 'absolute',
	},
})

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
				localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`) //store identification token in application
				setState({ loading: false })
				props.history.push('/profile-user')
			})
			.catch((err) => {
				console.log(err.response.data)
				setState({ loading: false, errors: err.response.data })
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
						// error={errors.email ? true : false}
						value={state.email}
						onChange={handleChange}
						fullWidth
					></TextField>

					<TextField
						id='password'
						name='password'
						label='Password'
						className={classes.textField}
						// helperText={state.errors.password}
						// error={errors.password ? true : false}
						value={state.password}
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
						disabled={loading}
					>
						Login
						{loading && (
							<CircularProgress
								size={20}
								className={classes.circularProgress}
							/>
						)}
					</Button>

					<Typography className={classes.register}>
						Don't have an account ? Register <Link to='/register'>here</Link>
					</Typography>
				</form>
			</Grid>
			<Grid item sm={3} />
		</Grid>
	)
}

export default withStyles(styles)(Login)
