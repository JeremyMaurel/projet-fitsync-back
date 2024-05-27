/* eslint-disable max-len */
import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import userWeightCreateSchema from '../../schemas/userWeightCreateSchema.js';
import WeightTrackingController from '../../controllers/weightTrackingController.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

/**
 * @typedef {object} UserWeight
 * @property {number} id - The ID of the UserWeight
 * @property {string} date - The weighing date
 * @property {number} value - The weight value
 * @property {number} user_id - The ID of the user
 */

/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

/**
 * POST /api/v1/weight
 * @summary Creates a new weight entry for an user
 * @tags UserWeight
 * @security BearerAuth
 * @param {object} request.body.required - The user weight data
 * @param {number} request.body.value.required - The duration of the session in minutes
 * @param {string} request.body.date.required - The date and time of the session in the format 'YYYY-MM-DD HH:mm:ss+TZ'
 * @param {number} request.body.user_id.required - The ID of the user associated with the session
 * @return {UserWeight} 201 - Created - Successfully created the session
 * @return {ApiJsonError} 400 - Bad Request - Invalid session data provided
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing authorization token
 * @return {ApiJsonError} 404 - Not Found - User or activity not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.post('/weight', validateToken, validator(userWeightCreateSchema, 'body'), cw(WeightTrackingController.addUserWeight.bind(WeightTrackingController)));

/**
   * GET /api/v1/weight
   * @summary Get all the weight for an user
   * @tags UserWeight
   * @security BearerAuth
   * @param {string} userId.query - The ID of the user
   * @return {UserWeight[]} 200 - Success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
router.get('/weight', validateToken, cw(WeightTrackingController.getAllUserWeight.bind(WeightTrackingController)));

/**
   * DELETE /api/v1/weight/{id}
   * @summary Deletes a user weight based on user ID and userWeight ID
   * @tags UserWeight
   * @security BearerAuth
   * @param {string} authorization.header.required - Bearer token for authorization
   * @return {void} 204 - No Content - Successfully deleted the user weight
   * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
   * @return {ApiJsonError} 404 - Not Found - Session entry not found
   * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
   */
router.delete('/weight/:id', validateToken, cw(WeightTrackingController.deleteByUserId.bind(WeightTrackingController)));

export default router;
