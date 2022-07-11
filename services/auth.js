'use strict'
const jwt = require('jsonwebtoken');

function generateToken(email){
  try {
    return jwt.sign({ email }, process.env.TOKEN_SECRETO, { expiresIn:"2 days" })
  } catch (error) {
    console.log("file: auth.js ~ line 8 ~ generateToken ~ error", error)
  }
}

module.exports = {
  generateToken
}