import React, { useEffect } from 'react'

//Redux
import { connect } from 'react-redux'
import { getUserDetails } from '../redux/actions/userActions'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

const styles = () => ({
	list: {
		flexGrow: 1,
		marginTop: '2em',
	},

	profile: {
		flexGrow: 1,
		marginTop: '2em',
		textAlign: 'center',
	},

	title: {
		fontWeight: '800',
		textTransform: 'uppercase',
	},

	email: {
		margin: '0.5em 0',
	},

	shortDescription: {
		margin: '0.5em 0',
	},

	createdAt: {
		margin: '0.5em 0',
	},
})

function UserProfile(userData) {
	const { user, classes } = userData //props mui

	useEffect(() => {
		const username = userData.match.params.username
		userData.getUserDetails(username)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Grid container spacing={3} className={classes.list}>
			<Grid item sm={2} />

			<Grid item sm={8}>
				<Card className={classes.card}>
					<CardContent>
						<Typography className={classes.title} gutterBottom variant='h4'>
							{user.username}
						</Typography>

						<Typography variant='h6'>Name: &nbsp; {user.name}</Typography>

						<Typography className={classes.email}>
							Email: &nbsp; {user.email}
						</Typography>

						<Typography className={classes.shortDescription}>
							Description: &nbsp; {user.shortDescription}
						</Typography>

						<Typography className={classes.createdAt}>
							Register: &nbsp; {user.createdAt}
						</Typography>
					</CardContent>

					<CardActions>
						<Button size='small'>Go back</Button>
					</CardActions>
				</Card>
			</Grid>
			<Grid item sm={2} />
		</Grid>
	)
}

const mapStateToProps = (state) => ({
	user: state.user.profile,
})

export default connect(mapStateToProps, { getUserDetails })(
	withStyles(styles)(UserProfile)
)
