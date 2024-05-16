/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// import ApiError from '../../errors/api.error.js';
import debugMe from 'debug';

const debug = debugMe('app:coreController');

export default class CoreController {
  static entityName = null;

  static mainDatamapper = null;

  static async getAll(_, res) {
    debug(`[${this.entityName}] calling getAll method`);

    const rows = await this.mainDatamapper.findAll();
    return res.json({ total: rows.length, data: rows });
  }

  static async getOne(req, res, next) {
    debug(`[${this.entityName}] calling getOne method`);

    const { id } = req.params;
    const row = await this.mainDatamapper.findById(id);
    // if (!row) {
    //   return next(new ApiError(404, `${this.entityName} not found`));
    // }
    return res.json({ data: row });
  }

  static async create(req, res) {
    debug(`[${this.entityName}] calling create method`);
    const input = req.body;
    const row = await this.mainDatamapper.create(input);
    // 201 Created
    return res.status(201).json({ data: row });
  }

  static async update(req, res, next) {
    debug(`[${this.entityName}] calling update method`);
    const { id } = req.params;
    const input = req.body;
    const row = await this.mainDatamapper.update(id, input);
    // if (!row) {
    //   return next(new ApiError(404, `${this.entityName} not found`));
    // }
    return res.json({ data: row });
  }

  static async delete(req, res, next) {
    debug(`[${this.entityName}] calling delete method`);
    const { id } = req.params;
    const deleted = await this.mainDatamapper.delete(id);
    // if (!deleted) {
    //   return next(new ApiError(404, `${this.entityName} not found`));
    // }
    return res.status(204).json();
  }
}
