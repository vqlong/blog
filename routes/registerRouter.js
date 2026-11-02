import express from 'express';
import registerController from '../controllers/registerController.js';
const registerRouter = express.Router();

registerRouter.get('/', (req, res) => registerController.renderRegister(req, res));
registerRouter.post('/', (req, res) => registerController.register(req, res));

 export default registerRouter;
