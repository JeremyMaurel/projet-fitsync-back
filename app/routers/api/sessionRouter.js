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
 * GET /session-history
 * @summary Get all sessions with activities for a user
 * @tags History
 * @param {string} userId.query - The ID of the user
 * @return {SessionActivity[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('sessions-history', validateToken, cw(sessionController.getAllSessionWithActivitiesByUserId.bind(sessionController)));

/**
 * @route POST /session
 * @summary Creates a new session with the provided data
 * @tags Sessions
 * @param {integer} request.body.duration.required - The duration of the session in minutes
 * @param {string} request.body.date.required - The date and time of the session in the format 'YYYY-MM-DD HH:mm:ss+TZ'
 * @param {string} request.body.comment - An optional comment about the session
 * @param {integer} request.body.user_id.required - The ID of the user associated with the session
 * @param {integer} request.body.activity_id.required - The ID of the activity associated with the session
 * @return {201} 201 - Created - Successfully created the session
 * @return {400} 400 - Bad Request - Invalid session data provided
 * @return {401} 401 - Unauthorized - Invalid or missing authorization token
 * @return {404} 404 - Not Found - User or activity not found
 * @return {500} 500 - Internal Server Error - Unexpected error
 */
router.post('/sessions', validateToken, validator(sessionCreateSchema, 'body'), cw(sessionController.createSession.bind(sessionController)));

router.route('/sessions-history/:id')
  .get(validateToken, cw(sessionController.getOneSessionWithActivitiesByUserId.bind(sessionController)))

  /**
 * @route DELETE /session-history
 * @summary Deletes a session based on user ID and date from the query parameters
 * @tags Sessions
 * @param {string} authorization.header.required - Bearer token for authorization
 * @param {string} date.query.required - The date of the session in the format 'YYYY-MM-DD HH:mm:ss+TZ'
 * @return {204} 204 - No Content - Successfully deleted the session
 * @return {400} 400 - Bad Request - Date not provided
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {404} 404 - Not Found - Session entry not found
 * @return {500} 500 - Internal Server Error - Unexpected error
 */
  .delete(validateToken, cw(sessionController.deleteByUserId.bind(sessionController)))

  .patch(validateToken, validator(sessionUpdateSchema, 'body'), cw(sessionController.updateSessionByUserId.bind(sessionController)));
export default router;
