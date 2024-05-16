import CoreDatamapper from './coreDatamapper.js';

export default class TestDatamapper extends CoreDatamapper {
  static readTableName = 'category';

  static writeTableName = 'category';
}

// import pool from './client.js';

// export default async function getAllCategories() {
//   const sql = 'SELECT * FROM "category"';
//   const result = await pool.query(sql);
//   return result.rows;
// }
