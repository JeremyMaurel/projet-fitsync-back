import coreDatamapper from './utils/coreDatamapper.js';

export default class FavoriteDatamapper extends coreDatamapper {
  static readTableName = 'favorite';

  static writeTableName = 'favorite';

  async findAllfavoriteWithActivitiesByUserId(id) {
    const result = await this.pool.query(`
    SELECT "favorite"."created_at", "activity"."name" as "activity_name", "activity"."met" as "activity_met" FROM "favorite"
    JOIN "activity"
    ON "favorite"."activity_id" = "activity"."id"
    WHERE "user_id" = $1`, [id]);
    return result.rows[0];
  }
}
