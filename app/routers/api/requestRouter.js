import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import RequestController from '../../controllers/requestController.js';
import validator from '../../schemas/middleware/validator.js';
import requestsCreateSchema from '../../schemas/requestsCreateSchema.js';
import isAdmin from '../../middlewares/adminAuth.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

router.post('/requests', validateToken, validator(requestsCreateSchema, 'body'), cw(RequestController.createRequest.bind(RequestController)));

router.get('/requests', validateToken, isAdmin, cw(RequestController.getAll.bind(RequestController)));

router.get('/requests/:id', validateToken, isAdmin, cw(RequestController.getOne.bind(RequestController)));

router.delete('/requests/:id', validateToken, isAdmin, cw(RequestController.delete.bind(RequestController)));

export default router;
