/* jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");
const auth = require("../../services/auth");

/* AGREGAR NUEVO USUARIO */
router.post("/add_user", (req, res) => {
  controller
    .addUser(req.body.user)
    .then((new_user) => {
      response.success(res, new_user, 200);
    })
    .catch((err) => {
      console.log("err", err);
      response.error(res, "Internal Server Error", 500);
    });
});

/* LOGIN DE USUARIO */
router.post("/login", (req, res) => {
  controller
    .login(req.body.user)
    .then((user) => {
      response.success(res, user, 200);
    })
    .catch((err) => {
      console.log("err", err);
      response.error(res, "Internal Server Error", 500);
    });
});

router.get("/", auth.verifyToken, (req, res) => {
  controller
    .getUsers()
    .then((users) => {
      response.success(res, users, 200);
    })
    .catch((err) => {
      console.log("err", err);
      response.error(res, "Internal Server Error", 500);
    });
});

module.exports = router;
