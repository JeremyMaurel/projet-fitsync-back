import { Router } from 'express';
import userController from '../../controllers/userController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

router.get('/user', cw(userController.getUserByJWT.bind(userController)));

export default router;
