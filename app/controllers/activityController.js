import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class ActivityController extends CoreController {
  static entityName = 'activity';

  static mainDatamapper = datamappers.activityDatamapper;

  /**
   * Creates an activity based on activity ID and category ID.
   * @param {number} id - The ID of the session.
   * @param {Object} input - The created session data.
   * @param {number} CategoryId - The ID of the category.
   * @returns {Promise<Object>} - A promise that resolves to the created session.
   */
  static async createActivityByCategoryId(req, res, next) {
    const input = req.body;

    const category = await datamappers.categoryDatamapper.findById(input.categoryId);
    if (!category) {
      return next(new ApiError(404, 'Error', 'Activity\'s category not found'));
    }
    input.category_id = input.categoryId;
    delete input.categoryId;

    const newActivity = await this.mainDatamapper.create(input);
    return res.status(201).json({ data: newActivity });
  }

  /**
   * Updates an activity based on activity ID and category ID.
   * @param {number} id - The ID of the session.
   * @param {Object} input - The updated session data.
   * @param {number} CategoryId - The ID of the category.
   * @returns {Promise<Object>} - A promise that resolves to the updated session.
   */
  static async updateActivityByCategoryId(req, res, next) {
    const { id } = req.params;
    const input = req.body;

    if (input.categoryId) {
      const category = await datamappers.categoryDatamapper.findById(input.categoryId);
      if (!category) {
        return next(new ApiError(404, 'Error', 'Activity\'s category not found'));
      }
      input.category_id = input.categoryId;
      delete input.categoryId;
    }
    input.updated_at = new Date().toISOString();
    const updatedActivity = await this.mainDatamapper.update(id, input);
    return res.status(201).json({ data: updatedActivity });
  }
}
