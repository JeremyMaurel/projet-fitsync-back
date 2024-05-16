import CoreController from './utils/coreController.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class UserController extends CoreController {
  static entityName = 'user';

  static mainDatamapper = datamappers.userDatamapper;

  static async getUserByJWT(req, res) {
    const userId = this.getUserIdFromHeader(req, res);

    const row = await this.mainDatamapper.findById(userId);
    return res.json({ data: row });
  }
}
