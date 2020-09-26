import React, { useEffect } from 'react'
import axios from 'axios'

import UserCard from '../Components/UserCard'

//Redux
import { connect } from 'react-redux'
import { getUsersList } from '../redux/actions/dataActions'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = () => ({
	list: {
		flexGrow: 1,
		marginTop: '2em',
		textAlign: 'center',
	},

	table: {
		marginTop: '3em',
	},

	headerTable: {
		fontWeight: '800',
		textAlign: 'center',
	},

	rowTable: {
		fontWeight: '400',
		textAlign: 'center',
	},
})

function UsersList(usersData) {
	const { data, classes } = usersData

	useEffect(() => {
		usersData.getUsersList()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Grid container spacing={3} className={classes.list}>
			<Grid item sm={2} />

			<Grid item sm={8}>
				<Typography variant='h4'>Users List</Typography>

				<TableContainer component={Paper} className={classes.table}>
					<Table stickyHeader aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell className={classes.headerTable}>Email</TableCell>
								<TableCell className={classes.headerTable}>Name</TableCell>
								<TableCell className={classes.headerTable}>Username</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{data.lists.map((user) => (
								<TableRow key={user.key}>
									<TableCell
										component='th'
										scope='row'
										className={classes.rowTable}
									>
										{user.email}
									</TableCell>
									<TableCell className={classes.rowTable}>
										{user.name}
									</TableCell>
									<TableCell className={classes.rowTable}>
										{user.username}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>

			<Grid item sm={2} />
		</Grid>
	)
}

const mapStateToProps = (state) => ({
	data: state.data,
})

export default connect(mapStateToProps, { getUsersList })(
	withStyles(styles)(UsersList)
)
