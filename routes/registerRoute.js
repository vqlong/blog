const express = require('express');
const registerRoute = express.Router();
const registerController = require('../controllers/registerController.js');

registerRoute.get('/', (req, res) => registerController.renderRegister(req, res));
registerRoute.post('/', (req, res) => registerController.register(req, res));

module.exports = registerRoute;
