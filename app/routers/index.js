import { Router } from 'express';

import signUpRouter from './api/signUpRouter.js';
import categoryRouter from './api/categoryRouter.js';
import testRouter from './api/testRouter.js';

import error404 from '../middlewares/error404Handler.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

router.use(signUpRouter);
router.use(testRouter);
router.use(categoryRouter);

router.use(error404);

router.use(errorHandler);

export default router;
