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

  // Pour la fonction create, on sait qu'on enverra des json (depuis le body).
  // Selon la table, le json n'aura pas le même nombre d'informations
  // la table user a plus de colonne que la table category.
  // Donc je dois pouvoir adapter la création au nombre d'infos dans le json
  async create(input) {
    // Ici on génère la liste des colonnes et valeurs à insérer dans la requête
    const columns = Object.keys(input).join(', '); // pseudo, mail, password
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
