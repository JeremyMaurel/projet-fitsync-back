import { Router } from 'express';
import testRouter from './api/testRouter.js';
import sessionRouter from './api/sessionRouter.js';
import userRouter from './api/userRouter.js';
import favoriteRouter from './api/favoriteRouter.js';
import categoryRouter from './api/categoryRouter.js';
import activityRouter from './api/activityRouter.js';
import requestRouter from './api/requestRouter.js';
import error404 from '../middlewares/error404Handler.js';

const router = Router();

// Main router that collects all the individual routers for connection with Express
router.use(testRouter);
router.use(sessionRouter);
router.use(userRouter);
router.use(favoriteRouter);
router.use(categoryRouter);
router.use(activityRouter);
router.use(requestRouter);

// Use middleware to handle 404 errors if the requested route is not found
router.use(error404);

export default router;
