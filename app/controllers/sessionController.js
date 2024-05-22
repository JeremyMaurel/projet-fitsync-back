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
    const userId = req.user.id;
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
    const userId = req.user.id;
    const { date } = req.query;

    if (!date) {
      return next(new ApiError(404, 'Error', 'Date not provided'));
    }
    await this.mainDatamapper.deleteSessionWithActivityByUserId(userId, date);
    return res.status(204).json();
  }

  /**
   * Creates a new session for the logged-in user.
   * @param {object} req - The Express request object.
   * @param {object} req.body - The request body containing the session data.
   * @param {number} req.body.duration - The duration of the session in minutes.
   * @param {string} req.body.date - The date of the session.
   * @param {string} req.body.comment - A comment or note about the session.
   * @param {number} req.body.activity_id - The ID of the activity associated with the session.
   * @param {object} res - The Express response object.
   * @returns {Promise<void>}
   * A promise that resolves to sending a JSON response with the created session.
   * @throws {ApiError} - Throws an error if the session creation fails.
   */

  static async createSessionByUserLogged(req, res) {
    const {
      duration, date, comment, activity_id,
    } = req.body;
    const userId = req.user.id;

    // Verify if activity_id exists. Error handled in the datamapper.
    await datamappers.activityDatamapper.findById(activity_id);

    const newSession = await this.mainDatamapper.create({
      duration,
      date,
      comment,
      user_id: userId,
      activity_id,
    });
    return res.status(201).json({ data: newSession });
  }
}
