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
 * @typedef {object} User
 * @property {string} id - The user ID
 * @property {string} email - The user email
 * @property {string} pseudo - The user pseudo
 * @property {string} role - The user role
 */

/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

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
 * DELETE /user
 * @summary Deletes the user's account
 * @tags Users
 * @param {string} authorization.header.required - Bearer token for authorization
 * @return {void} 204 - No Content - Successfully deleted the account
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .delete(validateToken, cw(userController.deleteAccount.bind(userController)));

/**
 * POST /signup
 * @summary Create a new user account
 * @tags Users
 * @param {object} request.body.required - The user data - application/json
 * @param {string} request.body.mail - The email of the user
 * @param {string} request.body.pseudo - The pseudo of the user
 * @param {string} request.body.role - The role of the user (default: 'user')
 * @param {string} request.body.password - The password of the user
 * @return {User} 201 - Created - Successfully created the user
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.post('/signup', validator(userCreateSchema, 'body'), cw(userController.createUserWithHashedPassword.bind(userController)));

/**
 * POST /login
 * @summary Log in a user and return a JWT
 * @tags Auth
 * @param {object} request.body.required - The login data - application/json
 * @param {string} request.body.pseudo - The pseudo of the user
 * @param {string} request.body.password - The password of the user
 * @return {object} 200 - OK - Successfully logged in with JWT
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.post('/login', loginLimiter, validator(userLoginSchema, 'body'), cw(userController.login.bind(userController)));

/**
 * @route POST /logout
 * @summary Log out a user by clearing the JWT cookie
 * @tags Auth
 * @return {object} 200 - OK - Successfully logged out
 */
router.post('/logout', cw(userController.logout.bind(userController)));

export default router;
