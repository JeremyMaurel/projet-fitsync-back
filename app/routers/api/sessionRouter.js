/* eslint-disable max-len */
import { Router } from 'express';
import sessionController from '../../controllers/sessionController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import sessionCreateSchema from '../../schemas/sessionCreateSchema.js';
import sessionUpdateSchema from '../../schemas/sessionUpdateSchema.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

router.get('/sessions', validateToken, cw(sessionController.getAllSessionWithActivitiesByUserId.bind(sessionController)));

router.get('/sessions/:id', validateToken, cw(sessionController.getOneSessionWithActivitiesByUserId.bind(sessionController)));

router.delete('/sessions/:id', validateToken, cw(sessionController.deleteByUserId.bind(sessionController)));

router.patch('/sessions/:id', validateToken, validator(sessionUpdateSchema, 'body'), cw(sessionController.updateSessionByUserId.bind(sessionController)));

router.post('/sessions', validateToken, validator(sessionCreateSchema, 'body'), cw(sessionController.createSession.bind(sessionController)));

export default router;
