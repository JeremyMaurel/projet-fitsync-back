/* eslint-disable max-len */
import coreDatamapper from './utils/coreDatamapper.js';

export default class SessionDatamapper extends coreDatamapper {
  static readTableName = 'session';

  static writeTableName = 'session';

  /**
 * Finds all sessions done with their activities for a given user ID.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of sessions with their activity details.
 */
  async findAllSessionDoneWithActivitiesByUserId(id) {
    const result = await this.pool.query(`
    SELECT "session"."created_at", "session"."duration", "session"."comment", "activity"."name" as "activity_name", "activity"."met" as "activity_met" FROM "session"
    JOIN "activity"
    ON "session"."activity_id" = "activity"."id"
    WHERE "user_id" = $1`, [id]);

    return result.rows[0];
  }

  /**
 * Deletes a session based on user ID and date.
 * @param {number} userId - The ID of the user.
 * @param {string} date - The date of the session in a format recognized by PostgreSQL.
 */
  async deleteSessionByDateAndUserId(userId, date) {
    const result = await this.pool.query(' DELETE FROM "session" WHERE "user_id" = $1 AND "date" = $2', [userId, date]);
    return !!result.rowCount;
  }

  /**
 * Find a session based on user ID and date.
 * @param {number} userId - The ID of the user.
 * @param {string} date - The date of the session in a format recognized by PostgreSQL.
 */
  async findSessionByDateAndUserId(date, userId) {
    const result = await this.pool.query(' SELECT * FROM "session" WHERE "user_id" = $1 AND "date" = $2', [userId, date]);
    return result.rows[0];
  }
}
