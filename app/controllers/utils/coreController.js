/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import debugMe from 'debug';
import jwt from 'jsonwebtoken';
import getUserIdFromJWT from './getUserIdFromJwt.js';
import ApiError from '../../errors/apiError.js';

const debug = debugMe('off:coreController');

export default class CoreController {
  static entityName = null;

  static mainDatamapper = null;

  /**
   * Get all records
   * This method retrieves all records from the database using the datamapper's findAll method.
   * @param {Request} _ - The Express request object (unused)
   * @param {Response} res - The Express response object
   * @returns {Promise<Response>} - A JSON response with the total number of records and the data
   */
  static async getAll(_, res) {
    debug(`[${this.entityName}] calling getAll method`);
    const rows = await this.mainDatamapper.findAll();
    return res.json({ total: rows.length, data: rows });
  }

  /**
   * Get a single record by ID
   * This method retrieves a single record from the database using the datamapper's findById method.
   * @param {Request} req - The Express request object
   * @param {Response} res - The Express response object
   * @param {Function} next - The next middleware function in the Express chain
   * @returns {Promise<Response>} - A JSON response with the data of the record
   */
  static async getOne(req, res, next) {
    debug(`[${this.entityName}] calling getOne method`);

    const { id } = req.params;
    const row = await this.mainDatamapper.findById(id);
    if (!row) {
      return next(new ApiError(404, 'Api Error', `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }

  /**
   * Create a new record
   * This method creates a new record in the database using the datamapper's create method.
   * @param {Request} req - The Express request object
   * @param {Response} res - The Express response object
   * @returns {Promise<Response>} - A JSON response with the created record- status 201
   */
  static async create(req, res) {
    debug(`[${this.entityName}] calling create method`);
    const input = req.body;
    const row = await this.mainDatamapper.create(input);
    return res.status(201).json({ data: row });
  }

  /**
   * Update a record by ID
   * This method updates a record in the database using the datamapper's update method.
   * @param {Request} req - The Express request object
   * @param {Response} res - The Express response object
   * @param {Function} next - The next middleware function in the Express chain
   * @returns {Promise<Response>} - A JSON response with the updated record
   */
  static async update(req, res, next) {
    debug(`[${this.entityName}] calling update method`);
    const { id } = req.params;
    const input = req.body;
    const row = await this.mainDatamapper.update(id, input);
    if (!row) {
      return next(new ApiError(404, 'Api Error', `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }

  /**
   * Delete a record by ID
   * This method deletes a record from the database using the datamapper's delete method.
   * @param {Request} req - The Express request object
   * @param {Response} res - The Express response object
   * @param {Function} next - The next middleware function in the Express chain
   * @returns {Promise<Response>} - An empty JSON response with a 204 status code
   */
  static async delete(req, res, next) {
    debug(`[${this.entityName}] calling delete method`);
    const { id } = req.params;
    const deleted = await this.mainDatamapper.delete(id);
    if (!deleted) {
      return next(new ApiError(404, 'Api Error', `${this.entityName} not found`));
    }
    return res.status(204).json();
  }

  /**
 * Extracts the user ID from the JWT provided in the request headers.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {string|undefined} - Returns the user ID if successful, otherwise calls the next middleware with an error.
 */
  static getUserIdFromHeader(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new ApiError(401, 'Api Error', 'JWT NON FOURNI'));
    }
    const userToken = authHeader.split(' ')[1];
    const secretKey = 'prod';
    const userId = getUserIdFromJWT(userToken, secretKey);
    return userId;
  }
}
