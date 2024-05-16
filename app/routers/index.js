import { Router } from 'express';

import signUpRouter from './api/signUpRouter.js';
import testRouter from './api/testRouter.js';

const router = Router();

router.use(signUpRouter);
router.use(testRouter);

export default router;
