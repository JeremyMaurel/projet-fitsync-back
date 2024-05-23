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

  static async getOneSessionWithActivitiesByUserId(req, res, next) {
    const userId = req.user.id;
    const { id } = req.params;
    const row = await this.mainDatamapper.findOneSessionDoneWithActivitiesByUserId(id, userId);
    if (!row) {
      return next(new ApiError(404, 'Error', 'Sessions not found'));
    }
    return res.json({ data: row });
  }

  /**
   * Creates a new session for the logged-in user.
   * @param {object} req - The Express request object.
   * @param {object} req.body - The request body containing the session data.
   * @param {number} req.body.duration - The duration of the session in minutes.
   * @param {string} req.body.date - The date of the session.
   * @param {string} req.body.comment - A comment or note about the session.
   * @param {number} req.body.activityId - The ID of the activity associated with the session.
   * @param {object} res - The Express response object.
   * @returns {Promise<void>}
   * A promise that resolves to sending a JSON response with the created session.
   * @throws {ApiError} - Throws an error if the session creation fails.
   */
  static async createSession(req, res, next) {
    const userId = req.user.id;
    const input = req.body;
    input.user_id = userId;

    const activity = await datamappers.activityDatamapper.findById(input.activityId);
    if (!activity) {
      return next(new ApiError(404, 'Error', 'Activity not found'));
    }

    const verifDate = await datamappers.sessionDatamapper.findSessionByDateAndUserId(input.date, userId);

    if (verifDate) { return next(new ApiError(409, 'Conflict', 'You can only have one session at the same time')); }

    input.activity_id = input.activityId;
    delete input.activityId;

    const newSession = await this.mainDatamapper.create(input);
    return res.status(201).json({ data: newSession });
  }

  static async updateSessionByUserId(req, res, next) {
    const userId = req.user.id;
    const { id } = req.params;
    const input = req.body;

    if (input.activityId) {
      input.activity_id = input.activityId;
      delete input.activityId;
    }

    const row = await this.mainDatamapper.updateSessionByUserId(id, input, userId);
    if (!row) {
      return next(new ApiError(404, 'Api Error', `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }
}

// {date: valeur
// newDate:valeur
// duration:valeur
// activityId:valeur}
