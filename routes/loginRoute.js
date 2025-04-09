const express = require('express');
const loginRoute = express.Router();
const loginController = require('../controllers/loginController.js');

loginRoute.get('/', (req, res) => loginController.renderLogin(req, res));
loginRoute.post('/', (req, res) => loginController.login(req, res));

module.exports = loginRoute;
