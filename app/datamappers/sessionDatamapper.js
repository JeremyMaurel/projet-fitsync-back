/* eslint-disable max-len */
import ApiError from '../errors/apiError.js';
import coreDatamapper from './utils/coreDatamapper.js';

export default class SessionDatamapper extends coreDatamapper {
  static readTableName = 'session';

  static writeTableName = 'session';

  /**
 * Finds all sessions done with their activities for a given user ID.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of sessions with their activity details.
 * @throws {ApiError} - Throws an error if no sessions are found.
 */
  async findAllSessionDoneWithActivitiesByUserId(id) {
    const result = await this.pool.query(`
    SELECT "session"."created_at", "session"."duration", "session"."comment", "activity"."name" as "activity_name", "activity"."met" as "activity_met" FROM "session"
    JOIN "activity"
    ON "session"."activity_id" = "activity"."id"
    WHERE "user_id" = $1`, [id]);

    if (result.rows.length === 0) {
      throw new ApiError(404, 'No sessions found for this user');
    }

    return result.rows[0];
  }
}
