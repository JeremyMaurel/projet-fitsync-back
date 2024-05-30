import { Router } from 'express';
import ActivityController from '../../controllers/activityController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import activityCreateSchema from '../../schemas/activityCreateSchema.js';
import activityUpdateSchema from '../../schemas/activityUpdateSchema.js';
import isAdmin from '../../middlewares/adminAuth.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

router.get('/activities', cw(ActivityController.getAll.bind(ActivityController)));

router.get('/activities/:id', cw(ActivityController.getOne.bind(ActivityController)));

router.post('/activities', validateToken, isAdmin, validator(activityCreateSchema, 'body'), cw(ActivityController.createActivityByCategoryId.bind(ActivityController)));

router.patch('/activities/:id', validateToken, isAdmin, validator(activityUpdateSchema, 'body'), cw(ActivityController.updateActivityByCategoryId.bind(ActivityController)));

router.delete('/activities/:id', validateToken, isAdmin, cw(ActivityController.delete.bind(ActivityController)));

export default router;
