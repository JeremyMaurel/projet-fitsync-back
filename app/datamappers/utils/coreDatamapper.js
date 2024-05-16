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
    const result = await this.pool.query(`SELECT * FROM ${this.constructor.readTableName}`);
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
    const result = await this.pool.query(`SELECT * FROM ${this.constructor.writeTableName} WHERE id = $1`, [id]);
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
  // Pour la fonction create, on sait qu'on enverra des json (depuis le body).
  // Selon la table, le json n'aura pas le même nombre d'informations
  // la table user a plus de colonne que la table category.
  // Donc je dois pouvoir adapter la création au nombre d'infos dans le json
    // Ici on génère la liste des colonnes et valeurs à insérer dans la requête
    const columns = Object.keys(input).join(', '); // 'pseudo, 'mail', 'password'
    const values = Object.values(input); // ['Toto', 'toto@toto.fr', 'toto1023']

    // Ici on génère les paramètres $1, $2 ect... pour la requête (protection injonction)
    const placeholders = values.map((value, index) => `$${index + 1}`).join(', ');

    // Enfin, on créer l'utilisateur en base de donnée en envoyant la requête.
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
    const result = await this.pool.query(`DELETE FROM ${this.constructor.writeTableName} WHERE id = $1`, [id]);
    // Comme c'est un delete on ne renvoi pas de données.
    // Par contre on renvoi comme quoi il a bien supprimé un enregistrement
    return !!result.rowCount;
  }
}
