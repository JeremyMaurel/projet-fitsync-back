import { Router } from 'express';
import signUpRouter from './api/signUpRouter.js';
import testRouter from './api/testRouter.js';
import sessionRouter from './api/sessionRouter.js';
import userRouter from './api/userRouter.js';
import favoriteRouter from './api/favoriteRouter.js';
import categoryRouter from './api/categoryRouter.js';
import activityRouter from './api/activityRouter.js';
import requestRouter from './api/requestRouter.js';
import error404 from '../middlewares/error404Handler.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

// Main router that collects all the individual routers for connection with Express
router.use(signUpRouter);
router.use(testRouter);
router.use(sessionRouter);
router.use(userRouter);
router.use(favoriteRouter);
router.use(categoryRouter);
router.use(activityRouter);
router.use(requestRouter);

// Use middleware to handle 404 errors if the requested route is not found
router.use(error404);

// Use the error handling middleware to display error messages in a
// specific format if any errors occur
router.use(errorHandler);

export default router;
