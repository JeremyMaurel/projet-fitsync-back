/* eslint-disable max-len */
import { Router } from 'express';
import sessionController from '../../controllers/sessionController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import sessionCreateSchema from '../../schemas/sessionCreateSchema.js';
import sessionUpdateSchema from '../../schemas/sessionUpdateSchema.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

/**
 * @typedef {object} Session
 * @property {number} id - The ID of the Session
 * @property {string} date - The date and time when the session was created
 * @property {number} duration - The duration of the session in minutes
 * @property {string} comment - An optional comment about the session
 * @property {number} activity_id - The ID of the activity this session belongs to
 * @property {number} user_id - The ID of the user this session belongs to
 */

/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

/**
   * GET /sessions-history/{id}
   * @summary Get a specific session with activities for a user
   * @tags History
   * @param {string} id.path.required - The ID of the session
   * @return {SessionActivity} 200 - Success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
router.get('/sessions-history/:id', validateToken, cw(sessionController.getOneSessionWithActivitiesByUserId.bind(sessionController)));

/**
   * DELETE /sessions-history/{id}
   * @summary Deletes a session by ID
   * @tags Sessions
   * @param {string} authorization.header.required - Bearer token for authorization
   * @return {void} 204 - No Content - Successfully deleted the session
   * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
   * @return {ApiJsonError} 404 - Not Found - Session entry not found
   * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
   */
router.delete('/sessions-history/:id', validateToken, cw(sessionController.deleteByUserId.bind(sessionController)));

/**
 * PATCH /sessions-history/{id}
 * @summary Updates a session by ID
 * @tags Sessions
 * @param {string} authorization.header.required - Bearer token for authorization
 * @param {object} request.body.required - The session data to update
 * @param {number} request.body.duration - The duration of the session in minutes
 * @param {string} request.body.date - The date and time of the session in the format 'YYYY-MM-DD HH:mm:ss+TZ'
 * @param {string} request.body.comment - An optional comment about the session
 * @param {number} request.body.activity_id - The ID of the activity associated with the session
 * @return {Session} 200 - Success response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - Session entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.patch('/sessions-history/:id', validateToken, validator(sessionUpdateSchema, 'body'), cw(sessionController.updateSessionByUserId.bind(sessionController)));

/**
 * GET /sessions-history
 * @summary Get all sessions with activities for a user
 * @tags History
 * @param {string} userId.query - The ID of the user
 * @return {Session[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/sessions-history', validateToken, cw(sessionController.getAllSessionWithActivitiesByUserId.bind(sessionController)));

/**
 * POST /sessions
 * @summary Creates a new session with the provided data
 * @tags Sessions
 * @param {object} request.body.required - The session data
 * @param {number} request.body.duration.required - The duration of the session in minutes
 * @param {string} request.body.date.required - The date and time of the session in the format 'YYYY-MM-DD HH:mm:ss+TZ'
 * @param {string} request.body.comment - An optional comment about the session
 * @param {number} request.body.user_id.required - The ID of the user associated with the session
 * @param {number} request.body.activity_id.required - The ID of the activity associated with the session
 * @return {Session} 201 - Created - Successfully created the session
 * @return {ApiJsonError} 400 - Bad Request - Invalid session data provided
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing authorization token
 * @return {ApiJsonError} 404 - Not Found - User or activity not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.post('/sessions', validateToken, validator(sessionCreateSchema, 'body'), cw(sessionController.createSession.bind(sessionController)));

export default router;
