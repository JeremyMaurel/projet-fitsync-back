import { Router } from 'express';
import userController from '../../controllers/userController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
   * POST /signup
   * @summary Create a new user
   * @tags User
   * @param {UserCreateRequest} request.body.required - User creation request
   * @return {User[]} 201 - Created user response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
router.post('/signup', cw(userController.create.bind(userController)));

export default router;
