//CHECK EMPTY
const isEmpty = (str) => {
	if (str.trim() === '') return true
	else return false
}

//CHECK MAIL EXPRESSION
const isEmail = (email) => {
	const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email.match(emailRegEx)) return true
	else return false
}

exports.validateRegisterData = (data) => {
	let errors = {}

	//EMAIL validation
	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty'
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be a valid email address'
	}

	//OTHER FIELD validation
	if (isEmpty(data.username)) errors.username = 'Must not be empty'
	if (isEmpty(data.password)) errors.password = 'Must not be empty'
	if (data.password !== data.confirmPassword)
		errors.confirmPassword = 'Passwords must be the same'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false, //no key errors = no error so data valid
	}
}

exports.validateLoginData = (data) => {
	let errors = {}

	if (isEmpty(data.email)) errors.email = 'Must not be empty'
	if (isEmpty(data.password)) errors.password = 'Must not be empty'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	}
}

//CHECKING USER DETAILS
exports.reduceUserDetails = (data) => {
	let userDetails = {}

	if (!isEmpty(data.name.trim())) userDetails.name = data.name

	if (!isEmpty(data.shortDescription.trim()))
		userDetails.shortDescription = data.shortDescription

	return userDetails
}
