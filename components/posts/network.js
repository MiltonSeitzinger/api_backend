/* jshint esversion: 8 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const auth = require('../../services/auth');

router.post('/', auth.verifyToken, (req, res) => {
  controller.getPosts(req.body.limit,req.body.offset)
  .then((posts) => {
    response.success(res,posts,200);
    return;
  })
  .catch((err) => {
    console.log('err', err);
    response.error(res, 'Internal Server Error', 500);
  });
});

module.exports = router;
