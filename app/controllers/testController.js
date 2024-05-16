import CoreController from './coreController.js';
import datamappers from '../datamappers/indexDatamapper.js';

export default class TestController extends CoreController {
  static entityName = 'category';

  static mainDatamapper = datamappers.testDatamapper;
}
