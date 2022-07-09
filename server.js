const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const router = require(path.join(__dirname,'network','routes'));

const db = require('./db')
db(process.env.URLDB)

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

router(app);
app.listen(process.env.PORT);
console.log(`Corriendo en el puerto ${(process.env.PORT)}`)

module.exports = app