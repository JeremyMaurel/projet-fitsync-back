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
    const query = `
    SELECT 
    "s"."id", 
    "s"."date", 
    "s"."duration", 
    "s"."comment", 
    "a"."name" as "activity_name", 
    "a"."met" as "activity_met" 
    FROM "session" as "s"
    JOIN "activity" as "a"
    ON "s"."activity_id" = "a"."id"
    WHERE "s"."user_id" = $1`;

    const result = await this.pool.query(query, [id]);

    return result.rows;
  }

  /**
   * Finds a specific session done with its activities for a given user ID.
   * @param {number} id - The ID of the session.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Object>} - A promise that resolves to a session with its activity details.
   */
  async findOneSessionDoneWithActivitiesByUserId(id, userId) {
    const query = `
    SELECT 
    "s"."id", 
    "s"."date", 
    "s"."duration", 
    "s"."comment", 
    "a"."name" as 
    "activity_name", 
    "a"."met" as "activity_met" 
    FROM "session" as "s"
    JOIN "activity" as "a"
    ON "s"."activity_id" = "a"."id"
    WHERE "s"."id" = $1 AND "user_id" = $2`;

    const result = await this.pool.query(query, [id, userId]);

    return result.rows[0];
  }

  /**
   * Deletes a session based on user ID and date.
   * @param {number} userId - The ID of the user.
   * @param {string} date - The date of the session in a format recognized by PostgreSQL.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the success of the deletion.
   */
  async deleteSessionByDateAndUserId(userId, date) {
    const result = await this.pool.query(' DELETE FROM "session" WHERE "user_id" = $1 AND "date" = $2', [userId, date]);
    return !!result.rowCount;
  }

  /**
   * Finds a session based on user ID and date.
   * @param {number} userId - The ID of the user.
   * @param {string} date - The date of the session in a format recognized by PostgreSQL.
   * @returns {Promise<Object>} - A promise that resolves to the found session.
   */
  async findSessionByDateAndUserId(date, userId) {
    const result = await this.pool.query(' SELECT * FROM "session" WHERE "user_id" = $1 AND "date" = $2', [userId, date]);
    return result.rows[0];
  }

  /**
   * Updates a session based on session ID and user ID.
   * @param {number} id - The ID of the session.
   * @param {Object} input - The updated session data.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Object>} - A promise that resolves to the updated session.
   */
  async updateSessionByUserId(id, input, userId) {
    const updateColumns = [];
    const updateValues = [];

    Object.keys(input).forEach((key, index) => {
      updateColumns.push(`"${key}" = $${index + 1}`);
      updateValues.push(input[key]);
    });

    updateValues.push(userId, id);

    const query = `
    UPDATE "${this.constructor.writeTableName}" as "s"
    SET ${updateColumns.join(', ')}
    FROM "activity" as "a"
    WHERE "user_id" = $${updateValues.length - 1}
    AND "s"."id" = $${updateValues.length}
    AND "a"."id" = "activity_id"
    RETURNING "s"."id", "s"."date", "s"."duration", "s"."comment", "a"."name", "a"."met";
`;

    const result = await this.pool.query(query, updateValues);

    return result.rows[0];
  }
}
