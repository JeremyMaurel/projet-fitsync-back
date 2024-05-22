import { Router } from 'express';
import userController from '../../controllers/userController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import userCreateSchema from '../../schemas/userCreateSchema.js';
import userLoginSchema from '../../schemas/userLoginSchema.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

router.route('/user')

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
  .get(validateToken, cw(userController.getUserByJWT.bind(userController)))

/**
 * @route DELETE /user
 * @summary Deletes the user's account
 * @tags Users
 * @param {string} authorization.header.required - Bearer token for authorization
 * @return {204} 204 - No Content - Successfully deleted the account
 * @return {404} 404 - Not Found - User not found
 * @return {500} 500 - Internal Server Error - Unexpected error
 */
  .delete(validateToken, cw(userController.deleteAccount.bind(userController)));

/**
 * @route POST /signup
 * @summary Create a new user account
 * @tags Users
 * @param {object} request.body.required - The user data - application/json
 * @param {string} request.body.mail - The email of the user
 * @param {string} request.body.pseudo - The pseudo of the user
 * @param {string} request.body.role - The role of the user (default: 'user')
 * @param {string} request.body.password - The password of the user
 * @return {201} 201 - Created - Successfully created the user
 * @return {400} 400 - Bad Request - Validation error
 * @return {500} 500 - Internal Server Error - Unexpected error
 */
router.post('/signup', validator(userCreateSchema, 'body'), cw(userController.createUserWithHashedPassword.bind(userController)));

/**
 * @route POST /login
 * @summary Log in a user and return a JWT
 * @tags Auth
 * @param {object} request.body.required - The login data - application/json
 * @param {string} request.body.pseudo - The pseudo of the user
 * @param {string} request.body.password - The password of the user
 * @return {object} 200 - OK - Successfully logged in with JWT
 * @return {object} 400 - Bad Request - Authentication error
 * @return {object} 500 - Internal Server Error - Unexpected error
 */
router.post('/login', validator(userLoginSchema, 'body'), cw(userController.login.bind(userController)));

export default router;
