import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import MessageController from '../../controllers/messageController.js';
import messageCreateSchema from '../../schemas/messageCreateSchema.js';
import validator from '../../schemas/middleware/validator.js';

const router = Router();

router.route('/message')
  .post(validator(messageCreateSchema, 'body'), cw(MessageController.create.bind(MessageController)));
