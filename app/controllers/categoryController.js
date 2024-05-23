/* eslint-disable max-len */
import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class CategoryController extends CoreController {
  static entityName = 'category';

  static mainDatamapper = datamappers.categoryDatamapper;

  /**
 * Get a category with its activities
 * This method retrieves a category and all its associated activities from the database using the datamapper's findCategoryWithActivities method.
 * @param {Object} req - The Express request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.categoryId - The ID of the category to retrieve
 * @param {Object} res - The Express response object
 * @param {Function} res.json - The function to send a JSON response
 * @param {Function} next - The next middleware function in the Express chain
 * @returns {Promise<Response>} - A JSON response with the category and its activities
 */
  static async getCategoryWithActivities(req, res, next) {
    const { categoryId } = req.params;
    const category = await this.mainDatamapper.findCategoryWithActivities(categoryId);
    if (!category) {
      return next(new ApiError(404, 'Error', 'Category not found'));
    }
    return res.json({ data: category });
  }
}
