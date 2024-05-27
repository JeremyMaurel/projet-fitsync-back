import coreDatamapper from './utils/coreDatamapper.js';

export default class MessageDatamapper extends coreDatamapper {
  static readTableName = 'message';

  static writeTableName = 'message';
}
