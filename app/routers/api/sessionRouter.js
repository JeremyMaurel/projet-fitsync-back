import { Router } from 'express';
import sessionController from '../../controllers/sessionController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
 * GET /history
 * @summary Get all sessions with activities for a user
 * @tags History
 * @param {string} userId.query - The ID of the user
 * @return {SessionActivity[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/history', cw(sessionController.getAllFavoriteWithActivitiesByUserId.bind(sessionController)));

export default router;
