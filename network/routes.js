const users = require('../components/users/network');

const routes = function(server) {
	server.use('/api/users', users);
	server.use('*', (req, res) => {
  	res.status(200).send('Page not found');
})
}
module.exports = routes 