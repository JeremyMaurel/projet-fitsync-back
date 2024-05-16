import { Router } from 'express';
import ActivityController from '../../controllers/activityController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
 * GET /activities/{id}
 * @summary Get an activity by ID
 * @tags Activities
 * @param {number} id.path.required - The ID of the activity to retrieve
 * @return {Activity} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/activities/:id', cw(ActivityController.getOne.bind(ActivityController)));

export default router;
