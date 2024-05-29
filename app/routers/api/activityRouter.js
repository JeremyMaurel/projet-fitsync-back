import { Router } from 'express';
import ActivityController from '../../controllers/activityController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validateToken from '../../middlewares/authentification.js';
import validator from '../../schemas/middleware/validator.js';
import activityCreateSchema from '../../schemas/activityCreateSchema.js';
import activityUpdateSchema from '../../schemas/activityUpdateSchema.js';
import isAdmin from '../../middlewares/adminAuth.js';

const router = Router();

/**
 * @typedef {object} Data
 * @property {number} id - The ID of the activity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET value of the activity
 * @property {number} category_id - The ID of the category this activity
 * @property {timestamptz<string>} created_at - The creation date of the activity
 * @property {timestamptz<string>} updated_at - The update date of the activity
*/
/**
 * @typedef {object} Activities
 * @property {number} total - total of activities
 * @property {Data[]} data - an array containing the activities
 *
 */

/**
 * GET /api/v1/activities
 * @summary Get all activities
 * @tags Activities
 * @return {Activities} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized: JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/activities', cw(ActivityController.getAll.bind(ActivityController)));
/**
 * @typedef {object} Activity
 * @property {Data[]} data - The data of the activity

 */
/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */
/**
 * GET /api/v1/activities/{id}
 * @summary Get an activity by ID
 * @tags Activities
 * @param {number} id.path.required - The ID of the activity to retrieve
 * @return {Activity} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized: JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/activities/:id', cw(ActivityController.getOne.bind(ActivityController)));

/**
 * @typedef {object} newActivity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET value of the activity
 * @property {number} category_id - The ID of the category this activity
 *
 */

/**
 * POST /api/v1/activities
 * @summary Create a new activity
 * @tags Activities
 * @security BearerAuth
 * @param {newActivity} request.body.object.required - The new activity data - application/json
 * @param {string} name.string.required - The name of the activity
 * @param {number} met.number.required - The MET per minuts of the activity
 * @param {number} categoryId.number.required - The categoryId of the activity
 * @return {Activity} 200 - OK Successfully logged in with JWT - application/Json
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.post('/activities', validateToken, isAdmin, validator(activityCreateSchema, 'body'), cw(ActivityController.createActivityByCategoryId.bind(ActivityController)));

/**
 * @typedef {object} PatchActivity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET value of the activity
 * @property {number} category_id - The ID of the category this activity
 */
/**
 * PATCH api/v1/activities/{id}
 * @summary Update a new activity
 * @tags Activities
 * @security BearerAuth
 * @param {number} id.path.required - The ID of the activity to patch
 * @param {PatchActivity} request.body.required - The patched activity data - application/json
 * @param {string} name.string - The name of the activity
 * @param {number} met.number - The MET per minuts of the activity
 * @param {number} categoryId.number - The categoryId of the activity
 * @return {Activity} 200 - OK - Successfully logged in with JWT
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.patch('/activities/:id', validateToken, isAdmin, validator(activityUpdateSchema, 'body'), cw(ActivityController.updateActivityByCategoryId.bind(ActivityController)));

/**
 * DELETE api/v1/activities/{id}
 * @summary Delete a new activity
 * @tags Activities
 * @security BearerAuth
 * @param {number} id.path.required - The ID of the activity to delete
 * @return {void} 204 - No Content - Successfully deleted the activity
 * @return {ApiJsonError} 401 - Unauthorized:- Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - Activity entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
*/
router.delete('/activities/:id', validateToken, isAdmin, cw(ActivityController.delete.bind(ActivityController)));

export default router;
