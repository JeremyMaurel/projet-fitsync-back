import CoreController from './utils/coreController.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class UserController extends CoreController {
  static entityName = 'user';

  static mainDatamapper = datamappers.userDatamapper;

  /**
 * Retrieves the user by the JWT provided in the request headers.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns a promise that resolves with the response or an error.
 */
  static async getUserByJWT(req, res, next) {
    const userId = this.getUserIdFromHeader(req, res);
    const row = await this.mainDatamapper.findById(userId);
    if (!row) {
      return next(new ApiError(404, 'User not found'));
    }
    return res.json({ data: row });
  }
}
