/* eslint-disable max-len */
import { Router } from 'express';
import favoriteController from '../../controllers/favoriteController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import validateToken from '../../middlewares/authentification.js';
import favoriteCreateSchema from '../../schemas/favoriteCreateSchema.js';

const router = Router();
/**
 * @typedef {object} FavoritesData
 * @property {timestamptz<string>} created_at - The creation date of the favorite
 * @property {string} activity_name - The name of the favorite activity
 * @property {number} activity_met - The MET value of the favorite activity
 * @property {number} activity_id - The ID of the favorite activity
*/
/**
 * @typedef {object} Favorites
 * @property {number} total - Total of favorites
 * @property {FavoritesData[]} data - An array containing the favorites
 */
/**
 * @typedef {object} newFavorite
 * @property {number} activityId - The ID of the activity
 */
/**
 * @typedef {object} Favorite
 * @property {FavoritesData} data - An array containing the favorite
 */

/**
 * GET /api/v1/favorites
 * @summary Get all favorite activities for an authenticated user
 * @tags Favorites
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @return {Favorites} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/favorites', validateToken, cw(favoriteController.getAllFavoriteWithActivitiesByUserId.bind(favoriteController)));

/**
 * POST /api/v1/favorites
 * @summary Create a new favorite entry for an authenticated user
 * @tags Favorites
 * @security BearerAuth
 * @param {newFavorite} request.body.object.required - The request body containing the activity ID
 * @param {number} userId.cookie.required - The ID of the user
 * @param {number} activityId.path.required - The ID of the activity to be favorited
 * @return {Favorite} 201 - Created - Successfully created the favorite entry
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 409 - Conflict - Favorite entry already exists
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.post('/favorites', validateToken, validator(favoriteCreateSchema, 'body'), cw(favoriteController.createFavorite.bind(favoriteController)));

/**
 * DELETE /api/v1/favorites/{activityId}
 * @summary Delete a favorite entry by activity ID for an authenticated user
 * @tags Favorites
 * @security BearerAuth
 * @param {number} userId.number.required - The ID of the user
 * @param {number} activityId.number.required - The ID of the activity to be deleted
 * @return {void} 204 - No Content - Successfully deleted the favorite entry
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - Favorite entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.delete('/favorites/:activityId', validateToken, cw(favoriteController.deleteFavorite.bind(favoriteController)));

export default router;
