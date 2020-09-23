const functions = require('firebase-functions')

const admin = require('firebase-admin')

admin.initializeApp()

exports.createDocTest = functions.https.onRequest((req, res) => {
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
