import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class SessionController extends CoreController {
  static entityName = 'session';

  static mainDatamapper = datamappers.sessionDatamapper;

  static async getAllFavoriteWithActivitiesByUserId(req, res) {
    const userId = this.getUserIdFromHeader(req, res);

    const rows = await this.mainDatamapper.findAllSessionDoneWithActivitiesByUserId(userId);
    return res.json({ total: rows.length, data: rows });
  }
}
