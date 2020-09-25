const functions = require('firebase-functions')
const app = require('express')()

const firebaseConfig = require('./util/config')

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const { db, admin } = require('./util/admin')

const FbAuth = require('./util/FbAuth')

const {
	validateRegisterData,
	validateLoginData,
	reduceUserDetails,
} = require('./util/validationData')

//https/baseurl.com/api/... => convention    europe-west2- London
exports.api = functions.region('europe-west2').https.onRequest(app)

//*********************REGISTER API***************//
app.post('/register', (req, res) => {
	const newUser = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	}

	//checking errors
	const { valid, errors } = validateRegisterData(newUser)
	if (!valid) return res.status(400).json(errors)

	let token //token validation for each user (login use)

	db.doc(`/users/${newUser.username}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res.status(400).json({ message: 'username already exists' })
			} else {
				return firebase
					.auth()
					.createUserWithEmailAndPassword(newUser.email, newUser.password) //creation user
			}
		})

		// .then((data) => {
		// 	return res
		// 		.status(201)
		// 		.json({ message: `user ${data.user.uid} signed up successfully` }) //201 => resource created
		// })

		.then((data) => {
			//token identification generated
			userId = data.user.uid
			return data.user.getIdToken()
		})

		.then((tokenId) => {
			token = tokenId

			const userInformation = {
				//user details information add to db
				username: newUser.username,
				name: '',
				email: newUser.email,
				shortDescription: '',
				createdAt: new Date().toISOString().split('T')[0],
				userId,
			}

			return db.doc(`/users/${newUser.username}`).set(userInformation) //adding user information to db
		})
		.then(() => {
			return res.status(201).json({ token })
		})

		.catch((err) => {
			console.error(err)
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({ message: 'This email is already use.' }) //400 => request error client
			} else {
				return res.status(500).json({ general: 'Something went wrong' }) //500 => internal server error (request)
			}
		})

	return null
})

//*********************LOGIN API***************//
app.post('/login', (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	}

	//checking errors
	const { valid, errors } = validateLoginData(user)
	if (!valid) return res.status(400).json(errors)

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken()
		})
		.then((token) => {
			return res.json({ token })
		})
		.catch((err) => {
			console.error(err)
			if (err.code === 'auth/wrong-password') {
				return res
					.status(403)
					.json({ general: 'Wrong information, please try again' }) //403 => Unauthorized
			}
			return res.status(500).json({ error: err.code })
		})

	return null
})

//*********************UPDATING USER INFORMATION PROFILE***************//
app.post('/user', FbAuth, (req, res) => {
	let userProfile = reduceUserDetails(req.body)

	db.doc(`/users/${req.user.username}`)
		.update(userProfile)
		.then(() => {
			return res.json({ message: 'Details added successfully' })
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
})

//*********************GET USER INFORMATION***************//
app.get('/user', FbAuth, (req, res) => {
	let userData = {}

	db.doc(`/users/${req.username}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				//complete profile
				userData.profile = {
					name: doc.data().name,
					email: doc.data().email,
					shortDescription: doc.data().shortDescription,
					createdAt: doc.data().createdAt,
				}
			}

			return res.json(userData)
		})

		.catch((err) => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
})

//*********************GET ALL USERS INFORMATION***************//
app.get('/users', (req, res) => {
	db.collection('users')
		.orderBy('createdAt', 'desc') //ordering user profiles
		.get()
		.then((data) => {
			let users = []

			data.forEach((doc) => {
				//showing few information for each user
				users.push({
					username: doc.data().username,
					name: doc.data().name,
					email: doc.data().email,
				})
			})
			return res.json(users)
		})

		.catch((err) => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
})
