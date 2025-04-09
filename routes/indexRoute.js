const express = require('express');
const indexRoute = express.Router();

const indexController = require('../controllers/indexController.js');

indexRoute.get('/', (req, res) => indexController.index(req, res));
    
module.exports = indexRoute;