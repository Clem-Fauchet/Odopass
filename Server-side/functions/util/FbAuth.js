const { admin, db } = require('./admin')

module.exports = (req, res, next) => {
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
