import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class RequestController extends CoreController {
  static entityName = 'request';

  static mainDatamapper = datamappers.requestDatamapper;
}
