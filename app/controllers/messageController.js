import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';

export default class MessageController extends CoreController {
  static entityName = 'message';

  static mainDatamapper = datamappers.messageDatamapper;
}
