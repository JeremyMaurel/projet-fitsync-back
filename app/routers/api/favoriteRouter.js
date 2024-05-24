/* eslint-disable max-len */
import { Router } from 'express';
import favoriteController from '../../controllers/favoriteController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import validateToken from '../../middlewares/authentification.js';
import favoriteCreateSchema from '../../schemas/favoriteCreateSchema.js';

const router = Router();

/**
 * @typedef {object} Favorite
 * @property {number} userId - The ID of the user
 * @property {number} activityId - The ID of the activity
 */

/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

/**
 * GET /api/v1/favorites
 * @summary Get all favorite activities for a user
 * @tags Favorites
 * @security BearerAuth
 * @param {string} userId.query - The ID of the user
 * @return {Favorite[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/favorites', validateToken, cw(favoriteController.getAllFavoriteWithActivitiesByUserId.bind(favoriteController)));

/**
 * POST /api/v1/favorites
 * @summary Create a new favorite entry for the authenticated user
 * @tags Favorites
 * @security BearerAuth
 * @param {object} request.body.required - The request body containing the activity ID
 * @param {number} request.body.activityId - The ID of the activity to be favorited
 * @return {FavoriteActivity} 201 - Created - Successfully created the favorite entry
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 409 - Conflict - Favorite entry already exists
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.post('/favorites', validateToken, validator(favoriteCreateSchema, 'body'), cw(favoriteController.createFavorite.bind(favoriteController)));

/**
 * DELETE /api/v1/favorites/{activityId}
 * @summary Delete a favorite entry by activity ID for the authenticated user
 * @tags Favorites
 * @security BearerAuth
 * @param {number} activityId.path.required - The ID of the activity to be removed from favorites
 * @return {void} 204 - No Content - Successfully deleted the favorite entry
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - Favorite entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.delete('/favorites/:activityId', validateToken, cw(favoriteController.deleteFavorite.bind(favoriteController)));

export default router;
