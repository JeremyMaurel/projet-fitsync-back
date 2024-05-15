import { Router } from 'express';

import { router as loginRouter } from './api/loginRouter';
import { router as signUpRouter } from './api/signUpRouter';

const router = Router();

router.use(loginRouter);
router.use(signUpRouter);

export default router;
