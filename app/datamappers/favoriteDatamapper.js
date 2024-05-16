import coreDatamapper from './utils/coreDatamapper.js';

export default class FavoriteDatamapper extends coreDatamapper {
  static readTableName = 'favorite';

  static writeTableName = 'favorite';
}
