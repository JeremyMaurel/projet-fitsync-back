import CoreController from './utils/coreController.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class UserController extends CoreController {
  static entityName = 'user';

  static mainDatamapper = datamappers.userDatamapper;
}
