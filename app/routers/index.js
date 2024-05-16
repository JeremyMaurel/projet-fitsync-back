import { Router } from 'express';

import loginRouter from './api/loginRouter.js';
import signUpRouter from './api/signUpRouter.js';
import testRouter from './api/testRouter.js';

const router = Router();

router.use(loginRouter);
router.use(signUpRouter);
router.use(testRouter);

export default router;
