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
 * GET /api/v1/activities/{id}
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

/**
 * GET /api/v1/activities
 * @summary Get all activities
 * @tags Activities
 * @return {Activity} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/activities', cw(ActivityController.getAll.bind(ActivityController)));

/**
 * POST /api/v1/activities
 * @summary Create a new activity
 * @tags Activities
 * @security BearerAuth
 * @param {string} authorization.header.required - Bearer token for authorization
 * @param {object} request.body.required - The activity data - application/json
 * @param {string} request.body.name - The name of the activity
 * @param {number} request.body.met - The MET per minuts of the activity
 * @param {number} request.body.categoryId - The categoryId of the activity
 * @return {Activity} 200 - OK - Successfully logged in with JWT
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.post('/activities', validateToken, isAdmin, validator(activityCreateSchema, 'body'), cw(ActivityController.createActivityByCategoryId.bind(ActivityController)));

/**
 * PATCH api/v1/activities/{id}
 * @summary Update a new activity
 * @tags Activities
 * @security BearerAuth
 * @param {string} authorization.header.required - Bearer token for authorization
 * @param {object} request.body.required - The activity data - application/json
 * @param {string} request.body.name - The name of the activity
 * @param {number} request.body.met - The MET per minuts of the activity
 * @param {number} request.body.categoryId - The categoryId of the activity
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
 * @param {string} authorization.header.required - Bearer token for authorization
 * @return {void} 204 - No Content - Successfully deleted the activity
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - Activity entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
*/
router.delete('/activities/:id', validateToken, isAdmin, cw(ActivityController.delete.bind(ActivityController)));

export default router;
