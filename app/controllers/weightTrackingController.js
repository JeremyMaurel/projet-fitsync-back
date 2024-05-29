import CoreController from './utils/coreController.js';
import ApiError from '../errors/apiError.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class WeightTrackingController extends CoreController {
  static entityName = 'weight_tracking';

  static mainDatamapper = datamappers.weightTrackingDatamapper;

  static async addUserWeight(req, res) {
    const input = req.body;
    const userId = req.user.id;

    const newWeight = await this.mainDatamapper.createWeightTracking(input, userId);
    return res.status(201).json({ data: newWeight });
  }

  /**
   * Retrieves all userWeight by user ID from the request header.
   * @param {Object} req - The request object.
   * @param {Object} req.user - The user object.
   * @param {string} req.user.id - The ID of the user.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - Returns a promise that resolves with the response or an error.
   */
  static async getAllUserWeight(req, res, next) {
    const userId = req.user.id;

    const userWeight = await this.mainDatamapper.findAllUserWeight(userId);
    if (!userWeight) {
      return next(new ApiError(404, 'Error', 'Weight not found'));
    }
    return res.json({ total: userWeight.length, data: userWeight });
  }
}
