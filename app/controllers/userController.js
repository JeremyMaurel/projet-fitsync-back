import CoreController from './coreController.js';
import datamappers from '../datamappers/indexDatamapper.js';

export default class UserController extends CoreController {
  static entityName = 'user';

  static mainDatamapper = datamappers.userDatamapper;
}
