import CoreDatamapper from './coreDatamapper.js';

export default class UserDatamapper extends CoreDatamapper {
  static readTableName = 'user';

  static writeTableName = 'user';
}
