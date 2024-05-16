import { Router } from 'express';
import login from '../../controllers/loginController.js';
import * as test from '../../controllers/testController.js';

const router = Router();

router.post('/login', login);
router.get('/test', test.default);

export default router;
