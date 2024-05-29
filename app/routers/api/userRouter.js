import { Router } from 'express';
import userController from '../../controllers/userController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import userCreateSchema from '../../schemas/userCreateSchema.js';
import userUpdateSchema from '../../schemas/userUpdateSchema.js';
import userLoginSchema from '../../schemas/userLoginSchema.js';
import validateToken from '../../middlewares/authentification.js';
import { loginLimiter } from '../../middlewares/rateLimit.js';
import userEmailSchema from '../../schemas/userEmailSchema.js';
import userPasswordSchema from '../../schemas/userPasswordSchema.js';

const router = Router();

/**
 * @typedef {object} User
 * @property {string} id - The user ID
 * @property {string} email - The user email
 * @property {string} pseudo - The user pseudo
 * @property {string} role - The user role
 * @property {string} password - The user password
 * @property {string} birthdate - The user birthdate in the format 'YYYY-MM-DD'
 * @property {string} gender - The user gender (e.g., 'male', 'female', 'other')
 * @property {number} height - The user height in centimeters
 * @property {number} objective - The user's fitness objective (e.g., weight loss target in kg)
 */

/**
 * GET /api/v1/user
 * @summary Get user details from JWT
 * @tags User
 * @security BearerAuth
 * @return {User} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/user', validateToken, cw(userController.getUserByJWT.bind(userController)));

/**
 * DELETE /api/v1/user
 * @summary Deletes the user's account
 * @tags Users
 * @security BearerAuth
 * @param {string} authorization.header.required - Bearer token for authorization
 * @return {void} 204 - No Content - Successfully deleted the account
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.delete('/user', validateToken, cw(userController.delete.bind(userController)));

/**
   * PATCH /api/v1/user
   * @summary Update user details
   * @tags User
   * @security BearerAuth
   * @param {object} request.body.required - The user data to update - application/json
   * @param {string} request.body.email - The email of the user
   * @param {string} request.body.pseudo - The pseudo of the user
   * @param {string} request.body.password - The password of the user
   * @return {User} 200 - Success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 401 - Unauthorized - application/json
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
router.patch('/user', validateToken, validator(userUpdateSchema, 'body'), cw(userController.updateUserByUserId.bind(userController)));

/**
 * POST /api/v1/signup
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
 * POST /api/v1/login
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
 * POST /api/v1/logout
 * @summary Log out a user by clearing the JWT cookie
 * @tags Auth
 * @security BearerAuth
 * @return {object} 200 - OK - Successfully logged out
 */
router.post('/logout', validateToken, cw(userController.logout.bind(userController)));

/**
 * POST /api/v1/requestReset
 * @summary Request a password reset for a user
 * @tags Auth
 * @param {object} request.body.required - The email data - application/json
 * @param {string} request.body.email - The email of the user
 * @return {object} 200 - OK - Successfully sent reset password email
 * @return {ApiJsonError} 400 - Bad Request - Invalid email format
 * @return {ApiJsonError} 404 - Not Found - No user found with this email
 * @return {ApiJsonError} 500 - Internal Server Error - Error while sending email
 */
router.post('/requestReset', validator(userEmailSchema, 'body'), cw(userController.requestResetPassword.bind(userController)));

/**
 * POST /api/v1/resetPassword
 * @summary Reset the user's password
 * @tags Auth
 * @param {object} request.body.required - The reset password data - application/json
 * @param {string} request.body.newPassword - The new password of the user
 * @param {string} request.query.token - The JWT token for resetting the password
 * @return {object} 200 - OK - Successfully reset the password
 * @return {ApiJsonError} 400 - Bad Request - Invalid or expired token, or invalid password format
 * @return {ApiJsonError} 404 - Not Found - No user found with this token
 * @return {ApiJsonError} 500 - Internal Server Error - Error while resetting password
 */
router.post('/resetPassword', validator(userPasswordSchema, 'body'), cw(userController.resetPassword.bind(userController)));

export default router;
