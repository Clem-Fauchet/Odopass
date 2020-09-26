import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//Redux
import { connect } from 'react-redux'
import { registerUser } from '../redux/actions/userActions'

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

function Register(props) {
	const { classes } = props

	const [state, setState] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		errors: {},
	})

	useEffect(() => {
		if (props.UI.errors) {
			setState((prevState) => ({ ...prevState, errors: props.UI.errors })) //import errors to our state
		}
	}, [props.UI.errors])

	//submitting form
	const handleSubmit = (e) => {
		//submit form
		e.preventDefault()

		const newUserData = {
			username: state.username,
			email: state.email,
			password: state.password,
			confirmPassword: state.confirmPassword,
		}

		props.registerUser(newUserData, props.history)
	}

	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value }) //changing input with value
	}
	return (
		<Grid container className={classes.form}>
			<Grid item sm={3} />
			<Grid item sm>
				<Typography variant='h4' className={classes.pageTitle}>
					Register
				</Typography>

				<form noValidate onSubmit={handleSubmit}>
					<TextField
						id='username'
						name='username'
						label='Username'
						className={classes.textField}
						helperText={state.errors.username}
						error={state.errors.username ? true : false}
						value={state.username}
						onChange={handleChange}
						fullWidth
					></TextField>

					<TextField
						id='email'
						name='email'
						label='Email'
						className={classes.textField}
						helperText={state.errors.email}
						error={state.errors.email ? true : false}
						value={state.email}
						onChange={handleChange}
						fullWidth
					></TextField>

					<TextField
						id='password'
						name='password'
						label='Password'
						className={classes.textField}
						helperText={state.errors.password}
						error={state.errors.password ? true : false}
						value={state.password}
						onChange={handleChange}
						fullWidth
					></TextField>

					<TextField
						id='confirmPassword'
						name='confirmPassword'
						label='Confirm Password'
						className={classes.textField}
						helperText={state.errors.confirmPassword}
						error={state.errors.confirmPassword ? true : false}
						value={state.confirmPassword}
						onChange={handleChange}
						fullWidth
					></TextField>

					{state.errors.general && (
						<Typography variant='body2' className={classes.customError}>
							{state.errors.general}
						</Typography>
					)}

					<Button
						variant='contained'
						color='primary'
						className={classes.submitButton}
						onClick={handleSubmit}
						disabled={state.loading}
					>
						Register
						{state.loading && (
							<CircularProgress
								size={20}
								className={classes.circularProgress}
							/>
						)}
					</Button>

					<Typography className={classes.register}>
						Already have an account ? Login <Link to='/'>here</Link>
					</Typography>
				</form>
			</Grid>
			<Grid item sm={3} />
		</Grid>
	)
}

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
})

export default connect(mapStateToProps, { registerUser })(
	withStyles(styles)(Register)
)
