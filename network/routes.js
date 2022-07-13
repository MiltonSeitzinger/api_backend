/* jshint esversion: 8 */
const users = require('../components/users/network');
const posts = require('../components/posts/network');
const routes = function(server) {
		server.use('/api/users', users);
		server.use('/api/posts', posts);
		server.use('*', (req, res) => {
			res.status(404).send('Page not found');
	});
};
module.exports = routes;