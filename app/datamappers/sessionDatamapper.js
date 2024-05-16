import coreDatamapper from './utils/coreDatamapper.js';

export default class SessionDatamapper extends coreDatamapper {
  static readTableName = 'session';

  static writeTableName = 'session';

  async findAllSessionDoneWithActivitiesByUserId(id) {
    const result = await this.pool.query(`
    SELECT "session"."created_at", "session"."duration", "session"."comment", "activity"."name" as "activity_name", "activity"."met" as "activity_met" FROM "session"
    JOIN "activity"
    ON "session"."activity_id" = "activity"."id"
    WHERE "user_id" = $1`, [id]);
    return result.rows[0];
  }
}
