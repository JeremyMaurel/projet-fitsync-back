/* eslint-disable max-len */
/* eslint-disable consistent-return */
import CoreController from './utils/coreController.js';
import ApiError from '../errors/apiError.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class RequestController extends CoreController {
  static entityName = 'request';

  static mainDatamapper = datamappers.requestDatamapper;

  /**
 * Creates a new request for the logged-in user.
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The request body containing the request data.
 * @param {string} req.body.name - The name of the request.
 * @param {string} req.body.intensity - The intensity of the request.
 * @param {number} req.body.met - The MET (Metabolic Equivalent of Task) value of the request.
 * @param {Object} res - The Express response object.
 * @param {Function} res.status - The function to set the status code.
 * @param {Function} res.json - The function to send a JSON response.
 * @param {Function} next - The next middleware function in the Express chain.
 * @returns {Promise<void>} - A promise that resolves to sending a JSON response with the created request.
 * @throws {ApiError} - Throws an error if the request creation fails.
 */
  static async createRequest(req, res, next) {
    const input = req.body;
    const userId = req.user.id;
    input.user_id = userId;

    const maxRequest = await this.mainDatamapper.findByDateAndUserId(userId);
    if (maxRequest.length >= 5) {
      return next(new ApiError(409, 'Conflict', 'You only can create 5 request per day. If you want create more than 5, please contact the administrator.'));
    }
    const newRequest = await this.mainDatamapper.create(input);
    res.status(201).json({ data: newRequest });
  }
}
