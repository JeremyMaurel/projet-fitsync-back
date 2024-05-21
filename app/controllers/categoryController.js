import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class CategoryController extends CoreController {
  static entityName = 'category';

  static mainDatamapper = datamappers.categoryDatamapper;

  /**
 * Get a category with its activities
 * This method retrieves a category and all its associated activities from the
 * database using the datamapper's findCategoryWithActivities method.
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
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
