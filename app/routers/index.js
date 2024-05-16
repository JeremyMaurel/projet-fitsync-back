import { Router } from 'express';

import signUpRouter from './api/signUpRouter.js';

import testRouter from './api/testRouter.js';

import sessionRouter from './api/sessionRouter.js';

import userRouter from './api/userRouter.js';

import favoriteRouter from './api/favoriteRouter.js';

import error404 from '../middlewares/error404Handler.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

router.use(signUpRouter);
router.use(testRouter);
router.use(sessionRouter);
router.use(userRouter);
router.use(favoriteRouter);

router.use(error404);

router.use(errorHandler);

export default router;
