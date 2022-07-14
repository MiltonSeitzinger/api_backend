/* jshint esversion: 8 */
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const router = require(path.join(__dirname, "network", "routes"));
const db = require("./db");

var app = express();

dotenv.config();

db(process.env.URLDB);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

app.listen(process.env.PORT_API);

console.log(`Corriendo en el puerto ${process.env.PORT_API}`);

module.exports = app;
