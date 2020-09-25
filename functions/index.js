const functions = require('firebase-functions')
const app = require('express')()

const firebaseConfig = require('./util/config')

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const { db, admin } = require('./util/admin')

const {
	validateRegisterData,
	validateLoginData,
	reduceUserDetails,
} = require('./util/validationData')

//https/baseurl.com/api/... => convention    europe-west2- Londres
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
				email: newUser.email,
				createdAt: new Date().toISOString(),
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
				return res.status(500).json({ error: err.code }) //500 => internal server error (request)
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

//*********************GET USER INFORMATION API***************//
const FbAuth = (req, res, next) => {
	let tokenId

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		//Bearer string => convention
		tokenId = req.headers.authorization.split('Bearer ')[1] //get the second element => authentication Token
	} else {
		console.error('No token found')
		return res.status(403).json({ error: 'Unauthorized' })
	}

	admin
		.auth()
		.verifyIdToken(tokenId)
		.then((decodedToken) => {
			req.user = decodedToken
			console.log(decodedToken)
			return db
				.collection('users')
				.where('userId', '==', req.user.uid) //target user Id
				.limit(1) //get only one document
				.get()
		})
		.then((data) => {
			req.user.username = data.docs[0].data().username //extract username property => add to request
			return next() //allow to proceed
		})
		.catch((err) => {
			console.error('Error with token', err)
			return res.status(403).json(err)
		})

	return null
}

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
