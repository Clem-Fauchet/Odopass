const functions = require('firebase-functions')
const app = require('express')()

const admin = require('firebase-admin')

admin.initializeApp()

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

//TEST POST DOC FIREBASE
// app.post('/doc', (req, res) => {
// 	const newDoc = {
// 		body: req.body.body,
// 		userHandle: req.body.userHandle,
// 	}

// 	admin
// 		.firestore()
// 		.collection('doc')
// 		.add(newDoc)
// 		.then((doc) => {
// 			return res.json({ message: `document ${doc.id} created successfully` })
// 		})
// 		.catch((err) => {
// 			res.status(500).json({ error: 'Something went wrong' })
// 			console.error(err)
// 		})
// })

//REGISTER API
app.post('/register', (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.password,
	}

	firebase
		.auth()
		.createUserWithEmailAndPassword(newUser.email, newUser.password)
		.then((data) => {
			return res
				.status(201)
				.json({ message: `user ${data.user.uid} signed up successfully` }) //201 => ressource created
		})
		.catch((err) => {
			console.error(err)
			return res.status(400).json({ error: err.code }) //400 => server error
		})
})

//https/baseurl.com/api/... => convention    europe-west2- Londres
exports.api = functions.region('europe-west2').https.onRequest(app)
