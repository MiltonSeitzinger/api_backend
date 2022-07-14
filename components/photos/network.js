/* jshint esversion: 8 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const auth = require('../../services/auth');

router.post('/', auth.verifyToken, (req, res) => {
  let offset = req.body.offset ? req.body.offset-1 : 0;
  controller.getPhotos(req.body.limit, offset)
  .then((photos) => {
    response.success(res, photos, 200);
    return;
  })
  .catch((err) => {
    console.log('err', err);
    response.error(res, 'Internal Server Error', 500);
  });
});

module.exports = router;
