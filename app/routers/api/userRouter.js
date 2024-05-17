import { Router } from 'express';
import userController from '../../controllers/userController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
 * GET /user
 * @summary Get user details from JWT
 * @tags User
 * @return {User} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/user', cw(userController.getUserByJWT.bind(userController)));

export default router;
