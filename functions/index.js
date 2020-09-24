const functions = require('firebase-functions')

const admin = require('firebase-admin')

admin.initializeApp()

const express = require('express')
const app = express()

app.post('/doc', (req, res) => {
	const newDoc = {
		body: req.body.body,
		userHandle: req.body.userHandle,
	}

	admin
		.firestore()
		.collection('doc')
		.add(newDoc)
		.then((doc) => {
			return res.json({ message: `document ${doc.id} created successfully` })
		})
		.catch((err) => {
			res.status(500).json({ error: 'Something went wrong' })
			console.error(err)
		})
})

//https/baseurl.com/api/... convention
exports.api = functions.region('europe-west2').https.onRequest(app)
