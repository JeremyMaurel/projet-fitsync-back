/* eslint-disable consistent-return */
import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class RequestController extends CoreController {
  static entityName = 'request';

  static mainDatamapper = datamappers.requestDatamapper;

  /**
   * Creates a new request for the logged-in user.
   * @param {object} req - The Express request object.
   * @param {object} req.body - The request body containing the request data.
   * @param {string} req.body.name - The name of the request.
   * @param {string} req.body.intensity - The intensity of the request.
   * @param {number} req.body.met - The MET (Metabolic Equivalent of Task) value of the request.
   * @param {object} res - The Express response object.
   * @returns {Promise<void>}
   * A promise that resolves to sending a JSON response with the created request.
   * @throws {ApiError} - Throws an error if the request creation fails.
   */
  static async createRequestByUserLogged(req, res) {
    const { name, intensity, met } = req.body;
    const userId = req.user.id;

    const newRequest = await this.mainDatamapper.create({
      name,
      intensity,
      met,
      user_id: userId,
    });
    res.status(201).json({ data: newRequest });
  }
}
