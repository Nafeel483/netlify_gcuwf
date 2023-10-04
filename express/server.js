'use strict';
const express = require('express');
const path = require('path');
const cors = require("cors");
const serverless = require('serverless-http');
require("dotenv").config();
const app = express();
const bodyParser = require('body-parser');
const userController = require("./src/controllers/userController");
const connectDB = require('./src/connectMongo')


const router = express.Router();

connectDB()

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.login);
router.route("/update/:id").patch(userController.updateUser);
router.route("/gerUser").get(userController.getUserValue);
router.route("/").get(userController.getAllUsers);
router.route("/email").post(userController.emailSendUser);

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

app.use(cors());
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
