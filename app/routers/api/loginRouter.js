import { Router } from 'express';
import login from '../../controllers/loginController.js';
import * as test from '../../controllers/testController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

router.post('/login', login);
router.get('/test', cw(test.default));

export default router;
