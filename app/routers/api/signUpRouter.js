import { Router } from 'express';
import userController from '../../controllers/userController.js';

const router = Router();

router.post('/signup', userController.create.bind(userController));

export default router;
