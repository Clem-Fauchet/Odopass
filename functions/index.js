const functions = require('firebase-functions')
const app = require('express')()

const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore() //database firestore

const firebaseConfig = {
	apiKey: 'AIzaSyCkLt1KjtOdJYZTahNX7OQBnSc7s1HKOj8',
	authDomain: 'odopass-test.firebaseapp.com',
	databaseURL: 'https://odopass-test.firebaseio.com',
	projectId: 'odopass-test',
	storageBucket: 'odopass-test.appspot.com',
	messagingSenderId: '890270410291',
	appId: '1:890270410291:web:c8de4f68ea91c4636d6546',
	measurementId: 'G-KHKSVY39YG',
}

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

//CHECK EMPTY
const isEmpty = (str) => {
	if (str.trim() === '') return true
	else return false
}

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email.match(emailRegEx)) return true
	else return false
}

//REGISTER API
app.post('/register', (req, res) => {
	const newUser = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	}

	let errors = {}

	//EMAIL validation
	if (isEmpty(newUser.email)) {
		errors.email = 'Must not be empty'
	} else if (!isEmail(newUser.email)) {
		errors.email = 'Must be a valid email address'
	}

	//OTHER FIELD validation
	if (isEmpty(newUser.username)) errors.username = 'Must not be empty'
	if (isEmpty(newUser.password)) errors.password = 'Must not be empty'
	if (newUser.password !== newUser.confirmPassword)
		errors.confirmPassword = 'Passwords must be the same'

	if (Object.keys(errors).length > 0) return res.status(400).json(errors)

	let token //token validation for each user

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

			const userCredentials = {
				//user details information add to db
				username: newUser.username,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				userId,
			}

			return db.doc(`/users/${userId}`).set(userCredentials) //adding user credentials to db
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
})

//https/baseurl.com/api/... => convention    europe-west2- Londres
exports.api = functions.region('europe-west2').https.onRequest(app)
