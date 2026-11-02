import express from 'express';
import courseController from '../controllers/courseController.js';

const courseRouter = express.Router();


// cho phép server nhận dữ liệu dạng json
// courseRouter.use(express.json());

courseRouter.get('/:slug', (req, res) => courseController.renderCourse(req, res));

courseRouter.get('/', (req, res) => courseController.getCourses(req, res));
    
export default courseRouter;