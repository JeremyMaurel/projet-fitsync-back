/* eslint-disable max-len */
import { Router } from 'express';
import favoriteController from '../../controllers/favoriteController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import validateToken from '../../middlewares/authentification.js';
import favoriteCreateSchema from '../../schemas/favoriteCreateSchema.js';

const router = Router();
router.route('/favorites')

/**
 * GET /favorites
 * @summary Get all favorites activities for a user
 * @tags Favorites
 * @param {string} userId.query - The ID of the user
 * @return {FavoriteActivity[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .get(validateToken, cw(favoriteController.getAllFavoriteWithActivitiesByUserId.bind(favoriteController)))

/**
 * POST /favorites
 * @summary Create a new favorite entry for the authenticated user
 * @tags Favorites
 * @param {object} request.body.required - The request body containing the activity ID
 * @param {number} request.body.activityId - The ID of the activity to be favorited
 * @return {201} 201 - Created - Successfully created the favorite entry
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 409 - Conflict - Favorite entry already exists
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
  .post(validateToken, validator(favoriteCreateSchema, 'body'), cw(favoriteController.createFavorite.bind(favoriteController)));

/**
 * DELETE /favorites/:id
 * @summary Delete a favorite entry by activity ID for the authenticated user
 * @tags Favorites
 * @param {string} id.path.required - The ID of the activity to be removed from favorites
 * @return {204} 204 - No Content - Successfully deleted the favorite entry
 *  @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - Favorite entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.delete('/favorites/:activityId', validateToken, cw(favoriteController.deleteFavorite.bind(favoriteController)));

export default router;
