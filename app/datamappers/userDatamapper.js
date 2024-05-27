import CoreDatamapper from './utils/coreDatamapper.js';

export default class UserDatamapper extends CoreDatamapper {
  static readTableName = 'user';

  static writeTableName = 'user';

  async findByEmail(email) {
    const result = await this.pool.query(`SELECT * FROM "${this.constructor.writeTableName}" WHERE mail = $1`, [email]);
    return result.rows[0];
  }

  async findByPseudo(pseudo) {
    const result = await this.pool.query(`SELECT * FROM "${this.constructor.writeTableName}" WHERE pseudo = $1`, [pseudo]);
    return result.rows[0];
  }

  async updatePassword(id, newPassword) {
    await this.pool.query(`UPDATE "${this.constructor.writeTableName}" SET password = $1 WHERE id = $2`, [newPassword, id]);
  }
}
