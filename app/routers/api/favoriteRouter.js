import { Router } from 'express';
import favoriteController from '../../controllers/favoriteController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
 * GET /favorite
 * @summary Get all favorites activities for a user
 * @tags Favorites
 * @param {string} userId.query - The ID of the user
 * @return {FavoriteActivity[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/favorites', cw(favoriteController.getAllFavoriteWithActivitiesByUserId.bind(favoriteController)));

/**
 * DELETE /favorites/:id
 * @summary Delete a favorite entry by activity ID for the authenticated user
 * @tags Favorites
 * @param {string} id.path.required - The ID of the activity to be removed from favorites
 * @return {204} 204 - No Content - Successfully deleted the favorite entry
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid
 * @return {ApiJsonError} 404 - Not Found - Favorite entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
router.delete('/favorites/:ActivityId', cw(favoriteController.deleteFavorite.bind(favoriteController)));

export default router;
