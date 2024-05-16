import coreDatamapper from './utils/coreDatamapper.js';

export default class CategoryDatamapper extends coreDatamapper {
  static readTableName = 'category';

  static writeTableName = 'category';

  async findCategoryWithActivities(categoryId) {
    const result = await this.pool.query(`
      SELECT 
        c.id as category_id, 
        c.name as category_name, 
        a.id as activity_id, 
        a.name as activity_name, 
        a.met, 
        a.created_at, 
        a.updated_at 
      FROM "category" c
      LEFT JOIN "activity" a ON c.id = a.category_id
      WHERE c.id = $1
    `, [categoryId]);

    if (result.rows.length === 0) {
      return null;
    }

    const category = {
      id: result.rows[0].category_id,
      name: result.rows[0].category_name,
      activities: result.rows.filter((row) => row.activity_id !== null).map((row) => ({
        id: row.activity_id,
        name: row.activity_name,
        met: row.met,
        created_at: row.created_at,
        updated_at: row.updated_at,
      })),
    };

    return category;
  }
}
