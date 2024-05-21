import ApiError from '../../errors/apiError.js';

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
    if (result.rows.length === 0) {
      throw new ApiError(404, 'No records found');
    }
    return result.rows;
  }

  /**
 * Finds a record by ID
 *
 * This method retrieves a record from the database table specified by the class's
 * writeTableName property using the provided ID.
 *
 * @param {number} id - The ID of the record to retrieve
 * @returns {Object|null} - The retrieved record, or null if no record is found
 */
  async findById(id) {
    const result = await this.pool.query(`SELECT * FROM "${this.constructor.writeTableName}" WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      throw new ApiError(404, 'Record not found');
    }
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

    // Ensure input is not empty
    if (!input || Object.keys(input).length === 0) {
      throw new ApiError(400, 'No data provided for creation');
    }

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
    const updateColumns = Object.keys(input).join(', ');
    const updateValues = Object.values(input);

    updateValues.push(id);

    const result = await this.pool.query(`
    UPDATE "${this.constructor.writeTableName}"
    SET ${updateColumns}
    WHERE id = $${updateValues.length}
    RETURNING *;
    `, updateValues);

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Record not found');
    }
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
    const result = await this.pool.query(`DELETE FROM "${this.constructor.writeTableName}" WHERE id = $1`, [id]);
    // Since it's a delete operation, we don't return any data.
    // However, we return a boolean indicating whether a record was successfully deleted.
    return !!result.rowCount;
  }
}
