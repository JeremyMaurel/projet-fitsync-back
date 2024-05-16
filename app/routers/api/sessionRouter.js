import { Router } from 'express';
import sessionController from '../../controllers/sessionController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

router.get('/history', cw(sessionController.getAllByUserId.bind(sessionController)));

export default router;
