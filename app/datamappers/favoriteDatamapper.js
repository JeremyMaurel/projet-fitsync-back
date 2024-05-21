/* eslint-disable max-len */
import ApiError from '../errors/apiError.js';
import coreDatamapper from './utils/coreDatamapper.js';

export default class FavoriteDatamapper extends coreDatamapper {
  static readTableName = 'favorite';

  static writeTableName = 'favorite';

  /**
 * Finds all favorite activities with their details for a given user ID.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of favorite activities with their details.
 * @throws {ApiError} - Throws an error if no favorite activities are found.
 */
  async findAllfavoriteWithActivitiesByUserId(id) {
    const result = await this.pool.query(`
    SELECT "favorite"."created_at", "activity"."name" as "activity_name", "activity"."met" as "activity_met" FROM "favorite"
    JOIN "activity"
    ON "favorite"."activity_id" = "activity"."id"
    WHERE "user_id" = $1`, [id]);

    if (result.rows.length === 0) {
      throw new ApiError(404, 'No favorite activities found for this user');
    }

    return result.rows[0];
  }

  /**
 * Deletes a favorite entry based on user ID and activity ID.
 * @param {number} userId - The ID of the user.
 * @param {number} activityId - The ID of the activity.
 * @throws {ApiError} - Throws an error if no favorite entry is found to delete.
 */
  async deleteFavoriteWithActivityByUserId(userId, activityId) {
    const result = await this.pool.query(' DELETE FROM "favorite" WHERE "user_id" = $1 AND "activity_id" = $2', [userId, activityId]);
    if (result.rowCount === 0) {
      throw new ApiError(404, 'Favorite entry not found');
    }
  }
}
