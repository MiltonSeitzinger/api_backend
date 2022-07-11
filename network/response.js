exports.success = function (res, message, status, error = false ) {
	res.status(status || 200).send({
		error: error,
		body: message
	})
}

exports.error = function (res, message, status, details) {
	res.status(status || 500).send({
		error: message,
		body: ''
	})
}