import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class ActivityController extends CoreController {
  static entityName = 'activity';

  static mainDatamapper = datamappers.activityDatamapper;
}
