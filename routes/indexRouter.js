import express from 'express';
import indexController from '../controllers/indexController.js';
const indexRouter = express.Router();


indexRouter.get('/', (req, res) => indexController.index(req, res));
    
export default indexRouter;