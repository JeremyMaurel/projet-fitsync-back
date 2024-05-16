import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class FavoriteController extends CoreController {
  static entityName = 'favorite';

  static mainDatamapper = datamappers.favoriteDatamapper;
}
