import { Router } from 'express';
import ActivityController from '../../controllers/activityController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

router.get('/activities/:id', cw(ActivityController.getOne.bind(ActivityController)));

export default router;
