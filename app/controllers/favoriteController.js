/* eslint-disable max-len */
import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class FavoriteController extends CoreController {
  static entityName = 'favorite';

  static mainDatamapper = datamappers.favoriteDatamapper;

  /**
   * Retrieves all favorite activities by user ID from the request header.
   * @param {Object} req - The request object.
   * @param {Object} req.user - The user object.
   * @param {string} req.user.id - The ID of the user.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - Returns a promise that resolves with the response or an error.
   */
  static async getAllFavoriteWithActivitiesByUserId(req, res, next) {
    const userId = req.user.id;
    const rows = await this.mainDatamapper.findAllfavoriteWithActivitiesByUserId(userId);
    if (!rows) {
      return next(new ApiError(404, 'Error', 'Favorites not found'));
    }
    return res.json({ total: rows.length, data: rows });
  }

  /**
   * Deletes a favorite entry based on user ID and activity ID from the request.
   * @param {Object} req - The request object.
   * @param {Object} req.user - The user object.
   * @param {string} req.user.id - The ID of the user.
   * @param {Object} req.params - The request parameters.
   * @param {string} req.params.activityId - The ID of the activity to delete from favorites.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - Returns a promise that resolves with a 204 status on success.
   * @throws {ApiError} - Throws an error if the deletion fails.
   */
  static async deleteFavorite(req, res, next) {
    const userId = req.user.id;
    const { activityId } = req.params;

    const favorite = await this.mainDatamapper.findFavoriteByActivityIdAndUserId(activityId, userId);
    if (!favorite) {
      return next(new ApiError(404, 'Error', 'Favorite not found'));
    }

    await this.mainDatamapper.deleteFavoriteByActivityAndUserId(activityId, userId);
    return res.status(204).json();
  }

  /**
   * Creates a favorite entry based on user ID and activity ID from the request.
   * @param {Object} req - The request object.
   * @param {Object} req.user - The user object.
   * @param {string} req.user.id - The ID of the user.
   * @param {Object} req.body - The request body containing the activity ID.
   * @param {number} req.body.activityId - The ID of the activity to be favorited.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - Returns a promise that resolves with the created favorite entry and a 201 status on success.
   * @throws {ApiError} - Throws an error if the creation fails or if the favorite already exists.
   */
  static async createFavorite(req, res, next) {
    const { activityId } = req.body;
    const userId = req.user.id;

    const activity = await datamappers.activityDatamapper.findById(activityId);
    if (!activity) {
      return next(new ApiError(404, 'Error', 'Activity not found'));
    }

    const existingFavorite = await this.mainDatamapper.findFavoriteByActivityIdAndUserId(activityId, userId);

    if (existingFavorite) {
      return next(new ApiError(409, 'Conflit', 'Favorite already exists'));
    }
    const newFavorite = await this.mainDatamapper.create({
      user_id: userId,
      activity_id: activityId,
    });
    return res.status(201).json({ data: newFavorite });
  }
}
