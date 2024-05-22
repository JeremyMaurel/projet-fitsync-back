/* eslint-disable consistent-return */
import CoreController from './utils/coreController.js';

import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class RequestController extends CoreController {
  static entityName = 'request';

  static mainDatamapper = datamappers.requestDatamapper;

  static async createRequestByUserLogged(req, res, next) {
    const { name, intensity, met } = req.body;
    const userId = this.getUserIdFromHeader(req, res);
    if (!userId) {
      return next(new ApiError(404, 'Error404', 'User Not Found'));
    }
    const newRequest = await this.mainDatamapper.create({
      name,
      intensity,
      met,
      user_id: userId,
    });
    res.status(201).json(newRequest);
  }
}
