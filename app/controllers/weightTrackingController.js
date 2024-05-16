import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class WeightTrackingController extends CoreController {
  static entityName = 'weight_tracking';

  static mainDatamapper = datamappers.weightTrackingDatamapper;
}
