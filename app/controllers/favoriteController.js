import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class FavoriteController extends CoreController {
  static entityName = 'favorite';

  static mainDatamapper = datamappers.favoriteDatamapper;

  static async getAllFavoriteWithActivitiesByUserId(req, res) {
    const userId = this.getUserIdFromHeader(req, res);

    const rows = await this.mainDatamapper.findAllfavoriteWithActivitiesByUserId(userId);
    return res.json({ total: rows.length, data: rows });
  }
}
