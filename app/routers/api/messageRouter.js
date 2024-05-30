import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import MessageController from '../../controllers/messageController.js';
import messageCreateSchema from '../../schemas/messageCreateSchema.js';
import validator from '../../schemas/middleware/validator.js';
import isAdmin from '../../middlewares/adminAuth.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

router.get('/messages', validateToken, isAdmin, cw(MessageController.getAll.bind(MessageController)));

router.post('/messages', validateToken, validator(messageCreateSchema, 'body'), cw(MessageController.create.bind(MessageController)));

router.delete('/messages/:id', validateToken, isAdmin, cw(MessageController.delete.bind(MessageController)));

router.get('/messages/:id', validateToken, isAdmin, cw(MessageController.getOne.bind(MessageController)));
export default router;
