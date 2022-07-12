/* jshint esversion: 8 */
const jwt = require('jsonwebtoken');
const response = require('../network/response');

function generateToken(email){
  try {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn:"2 days" });
  } catch (error) {
    console.log("file: auth.js ~ line 8 ~ generateToken ~ error", error);
    return res.status(500).send('Internal Server Error');
  }
}

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      response.success(res,'No tienes autorización', 401);
      return;
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        response.success(res,'Token inválido', 403);
        return;
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log('error', error);
    response.error(res,'Internal Server Error', 500);
    return;
  }
}
module.exports = {
  generateToken,
  verifyToken
};