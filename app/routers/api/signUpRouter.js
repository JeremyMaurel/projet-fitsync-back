import { Router } from 'express';
import userController from '../../controllers/userController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

router.post('/signup', cw(userController.create.bind(userController)));

export default router;
