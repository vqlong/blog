import express from 'express';
import loginController from '../controllers/loginController.js';
const loginRouter = express.Router();

loginRouter.get('/', (req, res) => loginController.renderLogin(req, res));
loginRouter.post('/', (req, res) => loginController.login(req, res));

export default loginRouter;
