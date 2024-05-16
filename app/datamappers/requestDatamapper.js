import coreDatamapper from './utils/coreDatamapper.js';

export default class RequestDatamapper extends coreDatamapper {
  static readTableName = 'request';

  static writeTableName = 'request';
}
