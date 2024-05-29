/* eslint-disable max-len */
import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import userWeightCreateSchema from '../../schemas/userWeightCreateSchema.js';
import WeightTrackingController from '../../controllers/weightTrackingController.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

router.post('/weight', validateToken, validator(userWeightCreateSchema, 'body'), cw(WeightTrackingController.addUserWeight.bind(WeightTrackingController)));

router.get('/weight', validateToken, cw(WeightTrackingController.getAllUserWeight.bind(WeightTrackingController)));

router.delete('/weight/:id', validateToken, cw(WeightTrackingController.deleteByUserId.bind(WeightTrackingController)));

export default router;
