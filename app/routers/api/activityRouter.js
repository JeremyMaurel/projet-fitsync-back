import { Router } from 'express';
import ActivityController from '../../controllers/activityController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
 * @typedef {object} Activity
 * @property {number} id - The ID of the activity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET value of the activity
 * @property {number} category_id - The ID of the category this activity belongs to
 */

/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

/**
 * GET /activities/{id}
 * @summary Get an activity by ID
 * @tags Activities
 * @param {number} id.path.required - The ID of the activity to retrieve
 * @return {Activity} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/activities/:id', cw(ActivityController.getOne.bind(ActivityController)));

export default router;
