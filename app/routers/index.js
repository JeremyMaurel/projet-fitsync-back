import { Router } from 'express';

import loginRouter from './api/loginRouter.js';
import signUpRouter from './api/signUpRouter.js';
import error404 from '../middlewares/error404Handler.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

router.use(loginRouter);
router.use(signUpRouter);

router.use(error404);

router.use(errorHandler);

export default router;
