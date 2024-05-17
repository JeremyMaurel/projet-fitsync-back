import { Router } from 'express';
import favoriteController from '../../controllers/favoriteController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
 * GET /favorite
 * @summary Get all favorite activities for a user
 * @tags Favorites
 * @param {string} userId.query - The ID of the user
 * @return {FavoriteActivity[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/favorite', cw(favoriteController.getAllFavoriteWithActivitiesByUserId.bind(favoriteController)));

export default router;
