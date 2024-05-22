/* eslint-disable max-len */
import { Router } from 'express';
import sessionController from '../../controllers/sessionController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

/**
 * GET /history
 * @summary Get all sessions with activities for a user
 * @tags History
 * @param {string} userId.query - The ID of the user
 * @return {SessionActivity[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/sessions-history', validateToken, cw(sessionController.getAllSessionWithActivitiesByUserId.bind(sessionController)));

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
router.delete('/session-history', validateToken, cw(sessionController.deleteSession.bind(sessionController)));

export default router;
