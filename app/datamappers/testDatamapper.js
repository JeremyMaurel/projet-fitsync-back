import pool from './client.js';

const test = {
  async getAllCategories() {
    const sql = 'SELECT * FROM "category"';
    const result = await pool.query(sql);
    return result.rows;
  },
};

export default test;
