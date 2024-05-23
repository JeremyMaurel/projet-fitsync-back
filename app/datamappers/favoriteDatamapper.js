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
    const query = `SELECT 
    "f"."created_at", 
    "a"."name" as "activity_name", 
    "a"."met" as "activity_met",
    "a"."id" as "activity_id"
    FROM "favorite" as "f"
    JOIN "activity" as "a"
    ON "f"."activity_id" = "a"."id"
    WHERE "user_id" = $1`;

    const result = await this.pool.query(query, [id]);

    return result.rows;
  }

  /**
 * Deletes a favorite entry based on user ID and activity ID.
 * @param {number} userId - The ID of the user.
 * @param {number} activityId - The ID of the activity.
  * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the success of the deletion.
   */
  async deleteFavoriteByActivityAndUserId(activityId, userId) {
    const result = await this.pool.query(' DELETE FROM "favorite" WHERE "user_id" = $1 AND "activity_id" = $2', [userId, activityId]);
    return !!result.rowCount;
  }

  /**
   * Finds a favorite entry based on user ID and activity ID.
   * @param {number} userId - The ID of the user.
   * @param {number} activityId - The ID of the activity.
   * @returns {Promise<Object>} - A promise that resolves to the found favorite entry.
   */
  async findFavoriteByActivityIdAndUserId(activityId, userId) {
    const result = await this.pool.query(' SELECT * FROM "favorite" WHERE "user_id" = $1 AND "activity_id" = $2', [userId, activityId]);
    return result.rows[0];
  }
}
