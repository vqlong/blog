
// courseRoute

const express = require('express');
const courseRoute = express.Router();

const courseController = require('../controllers/courseController.js');

// cho phép server nhận dữ liệu dạng json
// courseRoute.use(express.json());

courseRoute.get('/:slug', (req, res) => courseController.renderCourse(req, res));

courseRoute.get('/', (req, res) => courseController.getCourses(req, res));
    
module.exports = courseRoute;