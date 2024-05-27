import CoreDatamapper from './utils/coreDatamapper.js';

export default class WeightTrackingDatamapper extends CoreDatamapper {
  static readTableName = 'weight_tracking';

  static writeTableName = 'weight_tracking';

  async createWeightTracking(input, userId) {
    const result = await this.pool.query(`
    INSERT INTO ${this.constructor.writeTableName} ("weight_id", "user_id","date")
    SELECT "weight"."id", $1, $2
    FROM "weight"
    WHERE "weight"."value" = $3
    RETURNING *, '${input.weight}' as "weight";`, [userId, input.date, input.weight]);
    return result.rows[0];
  }

  async findAllUserWeight(userId) {
    const result = await this.pool.query(`
    SELECT "value", "date", "user_id", "weight_tracking"."id"
    FROM "${this.constructor.readTableName}"
    JOIN "weight"
    ON "weight_id"="weight"."id"
    WHERE "${this.constructor.readTableName}"."user_id" = $1;`, [userId]); return result.rows;
  }
}
