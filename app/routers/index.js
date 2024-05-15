import { Router } from 'express';

import loginRouter from './api/loginRouter.js';
import signUpRouter from './api/signUpRouter.js';

const router = Router();

router.use(loginRouter);
router.use(signUpRouter);

export default router;
