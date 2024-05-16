import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class CategoryController extends CoreController {
  static entityName = 'category';

  static mainDatamapper = datamappers.categoryDatamapper;

  static async getCategoryWithActivities(req, res, next) {
    const { categoryId } = req.params;
    const category = await this.mainDatamapper.findCategoryWithActivities(categoryId);
    if (!category) {
      return next(new ApiError(404, 'Category not found'));
    }
    return res.json({ data: category });
  }
}
