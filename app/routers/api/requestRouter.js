import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import RequestController from '../../controllers/requestController.js';
import validator from '../../schemas/middleware/validator.js';
import requestsCreateSchema from '../../schemas/requestsCreateSchema.js';
import checkById from '../../schemas/middleware/checkById.js';
import datamappers from '../../datamappers/utils/indexDatamapper.js';

const { userDatamapper } = datamappers;

const router = Router();

router.post('/requests', validator(requestsCreateSchema, 'body'), checkById([{ modelInstance: userDatamapper, idKey: 'user_id', entityName: 'User' }]), cw(RequestController.create.bind(RequestController)));

export default router;
