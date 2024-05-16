/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// import ApiError from '../../errors/api.error.js';

export default class CoreController {
  static entityName = null;

  static mainDatamapper = null;

  static async getAll(_, res) {
    const rows = await this.mainDatamapper.findAll();
    return res.json({ total: rows.length, data: rows });
    /*
    Le fait de mettre une enveloppe me permettra demain d'ajouter facilement de la pagination et l'information qui la concerne
    par exemple je pourrais renvoyer des propriété supplémentaires, qui contiennent l'index de la ressource du début, l'index de la ressource de fin, le nombre d'enregistrement au toal…
    */
    /*
    data: […],
    start: 10,
    end: 20,
    total: 345
    */
    // return res.json(rows);
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    const row = await this.mainDatamapper.findById(id);
    // if (!row) {
    //   return next(new ApiError(404, `${this.entityName} not found`));
    // }
    return res.json({ data: row });
  }

  static async create(req, res) {
    const input = req.body;
    const row = await this.mainDatamapper.create(input);
    // 201 Created
    return res.status(201).json({ data: row });
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const input = req.body;
    const row = await this.mainDatamapper.update(id, input);
    // if (!row) {
    //   return next(new ApiError(404, `${this.entityName} not found`));
    // }
    return res.json({ data: row });
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    const deleted = await this.mainDatamapper.delete(id);
    // if (!deleted) {
    //   return next(new ApiError(404, `${this.entityName} not found`));
    // }
    return res.status(204).json();
  }
}
