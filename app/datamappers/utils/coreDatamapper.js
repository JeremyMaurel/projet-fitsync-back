/* eslint-disable max-len */
export default class CoreDatamapper {
  static readTableName = null;

  static writeTableName = null;

  /**
 * Initializes a new instance of the class
 * This constructor initializes the class with a database connection pool.
 * @param {Object} pool - The database connection pool
 */
  constructor(pool) {
    this.pool = pool;
  }

  /**
 * Retrieves all records
 * This method retrieves all records from the database table specified by the class's
 * readTableName property.
 * @returns {Object[]} - An array of all records
 */
  async findAll() {
    const result = await this.pool.query(`SELECT * FROM "${this.constructor.readTableName}"`);
    return result.rows;
  }

  /**
 * Finds all records by user ID.
 * This method retrieves all records from the database table associated with the provided user ID.
 * It returns an array of records.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of records associated with the user.
 */
  async findAllByUserId(userId) {
    const result = await this.pool.query(`SELECT * FROM "${this.constructor.readTableName}" WHERE "user_id" = $1`, [userId]);
    return result.rows;
  }

  /**
 * Finds one records by record Id and user ID.
 * This method retrieves one records from the database table associated with the provided user ID.
 * It returns a records.
 * @param {number} id - The ID of the record searched.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of records associated with the user.
 */
  async findOneByIdAndUserId(id, userId) {
    const result = await this.pool.query(`
    SELECT * from "${this.constructor.readTableName}"
    WHERE "${this.constructor.readTableName}"."id" = $1
    AND "user_id" = $2`, [id, userId]);
    return result.rows;
  }

  /**
 * Finds a record by ID
 * This method retrieves a record from the database table specified by the class's
 * writeTableName property using the provided ID.
 * @param {number} id - The ID of the record to retrieve
 * @returns {Object|null} - The retrieved record, or null if no record is found
 */
  async findById(id) {
    const result = await this.pool.query(`SELECT * FROM "${this.constructor.writeTableName}" WHERE id = $1`, [id]);
    return result.rows[0];
  }

  /**
 * Creates a new record
 * This method inserts a new record into the database table specified by the class's
 * readTableName property using the provided input data. It returns the newly created record.
 * @param {Object} input - The input data to create the new record with
 * @returns {Object} - The newly created record
 */
  async create(input) {
  // For the create function, we know that JSON data will be sent (from the body).
  // Depending on the table, the JSON will have a different number of fields.
  // For example, the user table has more columns than the category table.
  // Therefore, I need to adapt the creation process to the number of fields in the JSON.

    // Generate the list of columns and values to insert into the query
    const columns = Object.keys(input).join(', '); // 'pseudo, 'mail', 'password'
    const values = Object.values(input); // ['Toto', 'toto@toto.fr', 'toto1023']

    // Generate the placeholders $1, $2, etc., for the query (SQL injection protection)
    const placeholders = values.map((value, index) => `$${index + 1}`).join(', ');

    // Finally, create the record in the database by executing the query
    const result = await this.pool.query(`
        INSERT INTO "${this.constructor.readTableName}" (${columns})
        VALUES (${placeholders}) RETURNING *
      `, values);
    return result.rows[0];
  }

  /**
 * Updates a record by ID
 * This method updates a record in the database table specified by the class's
 * writeTableName property using the provided ID and input data. It returns
 * the updated record.
 * @param {number} id - The ID of the record to update
 * @param {Object} input - The input data to update the record with
 * @returns {Object} - The updated record
 */
  async update(id, input) {
    const updateColumns = [];
    const updateValues = [];

    Object.keys(input).forEach((key, index) => {
      updateColumns.push(`"${key}" = $${index + 1}`);
      updateValues.push(input[key]);
    });

    updateValues.push(id);

    const query = `
      UPDATE "${this.constructor.writeTableName}"
      SET ${updateColumns.join(',')}
      WHERE "id" = $${updateValues.length}
      RETURNING *;
    `;

    const result = await this.pool.query(query, updateValues);

    return result.rows[0];
  }

  /**
 * Deletes a record by ID
 * This method deletes a record from the database table specified by the class's
 * writeTableName property using the provided ID.
 * @param {number} id - The ID of the record to delete
 * @returns {boolean} - Returns true if a record was deleted, false otherwise
 */
  async delete(id) {
    const result = await this.pool.query(`DELETE FROM "${this.constructor.writeTableName}" WHERE "id" = $1`, [id]);
    // Since it's a delete operation, we don't return any data.
    // However, we return a boolean indicating whether a record was successfully deleted.
    return !!result.rowCount;
  }

  /**
 * Deletes a record by its ID and user ID.
 * This method deletes a record from the database table using the provided ID and user ID.
 * It returns a boolean indicating whether the deletion was successful.
 * @param {number} id - The ID of the record to delete.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the success of the deletion.
 */
  async deleteByUserId(id, userId) {
    const result = await this.pool.query(`DELETE FROM "${this.constructor.writeTableName}" WHERE "id" = $1 AND "user_id" = $2`, [id, userId]);
    return !!result.rowCount;
  }
}
