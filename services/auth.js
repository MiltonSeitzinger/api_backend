/* jshint esversion: 8 */
const jwt = require('jsonwebtoken');
const response = require('../network/response');
const store = require('../components/users/store');

function generateToken(email){
  try {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn:"2 days" });
  } catch (error) {
    console.log("generateToken ~ error", error);
    return res.status(500).send('Internal Server Error');
  }
}

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      response.success(res,'No tienes autorización', 401);
      return;
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) {
        console.log(err);
        response.success(res,'Token inválido', 403);
        return;
      }
      let userDB = await store.getUserByEmail(user.email);
      if(userDB.email == user.email){
        req.user = user;
        next();
      } else {
        response.success(res,'Token inválido', 403);
        return;
      }
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