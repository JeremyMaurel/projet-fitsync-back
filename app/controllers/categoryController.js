import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class CategoryController extends CoreController {
  static entityName = 'category';

  static mainDatamapper = datamappers.categoryDatamapper;
}
