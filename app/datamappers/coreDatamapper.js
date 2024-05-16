export default class CoreDatamapper {
  static readTableName = null;

  static writeTableName = null;

  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const result = await this.pool.query(`SELECT * FROM ${this.constructor.readTableName}`);
    return result.rows;
  }

  async findById(id) {
    const result = await this.pool.query(`SELECT * FROM ${this.constructor.readTableName} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async create(input) {
    // On envoi un objet côté JS, et il est interprété sous forme de JSON côté SQL
    /*
      input pour catégorie : {
        label: 'label de catégorie',
        route: 'route de catégorie'
      }

      */
    const result = await this.pool.query(`
        SELECT * FROM create_${this.constructor.readTableName}($1)
      `, [input]);
    return result.rows[0];
  }

  async update(id, input) {
    const result = await this.pool.query(`
        SELECT * FROM update_${this.constructor.readTableName}($1)
      `, [
      {
        ...input,
        id,
      },
    ]);
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.pool.query(`DELETE FROM ${this.constructor.writeTableName} WHERE id = $1`, [id]);
    // Comme c'est un delete on ne renvoi pas de données.
    // Par contre on renvoi comme quoi il a bien supprimé un enregistrement
    return !!result.rowCount;
  }
}
