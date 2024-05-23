import coreDatamapper from './utils/coreDatamapper.js';

export default class RequestDatamapper extends coreDatamapper {
  static readTableName = 'request';

  static writeTableName = 'request';

  async findByDateAndUserId(userId) {
    const result = await this.pool.query(`SELECT *
  FROM "request"
  WHERE created_at >= NOW() - INTERVAL '24 hours' AND user_id=$1;`, [userId]);
    return result.rows;
  }
}
