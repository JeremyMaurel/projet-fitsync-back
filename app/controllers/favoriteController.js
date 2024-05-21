import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class FavoriteController extends CoreController {
  static entityName = 'favorite';

  static mainDatamapper = datamappers.favoriteDatamapper;

  /**
 * Retrieves all favorite activities by user ID from the request header.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns a promise that resolves with the response or an error.
 */
  static async getAllFavoriteWithActivitiesByUserId(req, res, next) {
    const userId = this.getUserIdFromHeader(req, res);
    const rows = await this.mainDatamapper.findAllfavoriteWithActivitiesByUserId(userId);
    if (!rows) {
      return next(new ApiError(404, 'Favorites not found'));
    }
    return res.json({ total: rows.length, data: rows });
  }

  /**
 * Deletes a favorite entry based on user ID and activity ID from the request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves with a 204 status on success.
 * @throws {ApiError} - Throws an error if the deletion fails.
 */
  static async deleteFavorite(req, res, next) {
    const userId = this.getUserIdFromHeader(req, res);
    const { ActivityId } = req.params;
    if (!ActivityId) {
      return next(new ApiError(404, 'Not found'));
    }
    await this.mainDatamapper.deleteFavoriteWithActivityByUserId(userId, ActivityId);
    return res.status(204).json();
  }
}
