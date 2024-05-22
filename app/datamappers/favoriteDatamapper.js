/* eslint-disable max-len */
import coreDatamapper from './utils/coreDatamapper.js';

export default class FavoriteDatamapper extends coreDatamapper {
  static readTableName = 'favorite';

  static writeTableName = 'favorite';

  /**
 * Finds all favorite activities with their details for a given user ID.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of favorite activities with their details.
 */
  async findAllfavoriteWithActivitiesByUserId(id) {
    const result = await this.pool.query(`
    SELECT "favorite"."created_at", "activity"."name" as "activity_name", "activity"."met" as "activity_met" FROM "favorite"
    JOIN "activity"
    ON "favorite"."activity_id" = "activity"."id"
    WHERE "user_id" = $1`, [id]);

    return result.rows;
  }

  /**
 * Deletes a favorite entry based on user ID and activity ID.
 * @param {number} userId - The ID of the user.
 * @param {number} activityId - The ID of the activity.
 */
  async deleteFavoriteByActivityAndUserId(userId, activityId) {
    const result = await this.pool.query(' DELETE FROM "favorite" WHERE "user_id" = $1 AND "activity_id" = $2', [userId, activityId]);
    return !!result.rowCount;
  }

  /**
 * Find a favorite entry based on user ID and activity ID.
 * @param {number} userId - The ID of the user.
 * @param {number} activityId - The ID of the activity.
 */
  async findFavoriteByActivityIdAndUserId(activityId, userId) {
    const result = await this.pool.query(' SELECT * FROM "favorite" WHERE "user_id" = $1 AND "activity_id" = $2', [userId, activityId]);
    return result.rows[0];
  }
}
