/* eslint-disable max-len */
/* eslint-disable camelcase */
import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class SessionController extends CoreController {
  static entityName = 'session';

  static mainDatamapper = datamappers.sessionDatamapper;

  /**
 * Retrieves all sessions done with activities by user ID from the request header.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns a promise that resolves with the response or an error.
 */
  static async getAllSessionWithActivitiesByUserId(req, res, next) {
    const userId = this.getUserIdFromHeader(req, res);
    const rows = await this.mainDatamapper.findAllSessionDoneWithActivitiesByUserId(userId);
    if (!rows) {
      return next(new ApiError(404, 'Error', 'Sessions not found'));
    }
    return res.json({ total: rows.length, data: rows });
  }

  /**
 * Deletes a session based on user ID and date from the request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns a promise that resolves with a 204 status on success.
 * @throws {ApiError} - Throws an error if the date is not provided or if no session is found to delete.
 */
  static async deleteSession(req, res, next) {
    const userId = this.getUserIdFromHeader(req, res);
    const { date } = req.query;

    if (!date) {
      return next(new ApiError(404, 'Error', 'Date not provided'));
    }
    await this.mainDatamapper.deleteSessionWithActivityByUserId(userId, date);
    return res.status(204).json();
  }
}
