/* jshint esversion: 8 */
exports.success = function (res, message, status, error = false ) {
	res.status(status || 200).send({
		error: error,
		message: message
	});
};

exports.returnStatus = function (res, message, status, error = false ) {
	res.status(status || 400).send({
		error: error,
		message: message
	});
};

exports.error = function (res, message, status, details) {
	res.status(status || 500).send({
		error: message,
		message: ''
	});
};

