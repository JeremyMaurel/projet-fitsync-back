/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import debugMe from 'debug';
import ApiError from '../../errors/apiError.js';

const debug = debugMe('off:coreController');

export default class CoreController {
  static entityName = null;

  static mainDatamapper = null;

  /**
 * Get all records
 * This method retrieves all records from the database using the datamapper's findAll method.
 * @param {Object} _ - The Express request object (unused)
 * @param {Object} res - The Express response object
 * @param {Function} res.json - The function to send a JSON response
 * @returns {Promise<Response>} - A JSON response with the total number of records and the data
 */
  static async getAll(_, res) {
    debug(`[${this.entityName}] calling getAll method`);
    const rows = await this.mainDatamapper.findAll();
    return res.json({ total: rows.length, data: rows });
  }

  /**
 * Get all records by user ID
 * This method retrieves all records associated with a specific user ID from the database using the datamapper's findAllByUserId method.
 * @param {Object} req - The Express request object
 * @param {Object} req.user - The user object attached to the request
 * @param {string} req.user.id - The ID of the user
 * @param {Object} res - The Express response object
 * @param {Function} res.json - The function to send a JSON response
 * @returns {Promise<Response>} - A JSON response with the total number of records and the data
 */
  static async getAllByUserId(req, res) {
    const userId = req.user.id;
    const rows = await this.mainDatamapper.findAllByUserId(userId);
    return res.json({ total: rows.lenght, data: rows });
  }

  /**
 * Get a single record by ID
 * This method retrieves a single record from the database using the datamapper's findById method.
 * @param {Object} req - The Express request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.id - The ID of the entity to retrieve
 * @param {Object} res - The Express response object
 * @param {Function} res.json - The function to send a JSON response
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
 * Get a single record by ID and user Id
 * This method retrieves a single record from the database using the datamapper's findOneByIdAndUserId method.
 * @param {Object} req - The Express request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.id - The ID of the entity to retrieve
 * @param {string} req.user.id - The ID of the user
 * @param {Object} res - The Express response object
 * @param {Function} res.json - The function to send a JSON response
 * @param {Function} next - The next middleware function in the Express chain
 * @returns {Promise<Response>} - A JSON response with the data of the record
 */
  static async getOneByIdAndUserId(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;
    const rows = await this.mainDatamapper.findOneByIdAndUserId(id, userId);
  }

  /**
 * Create a new record
 * This method creates a new record in the database using the datamapper's create method.
 * @param {Object} req - The Express request object
 * @param {Object} req.body - The request body containing the data for the new record
 * @param {Object} res - The Express response object
 * @param {Function} res.status - The function to set the status code
 * @param {Function} res.json - The function to send a JSON response
 * @returns {Promise<Response>} - A JSON response with the created record and a status code of 201
 */
  static async create(req, res) {
    debug(`[${this.entityName}] calling create method`);
    const input = req.body;
    const row = await this.mainDatamapper.create(input);
    return res.status(201).json({ data: row });
  }

  static async createByUserId(req, res) {
    const input = req.body;
    const userId = req.user.id;
    input.user_id = userId;
    const row = await this.mainDatamapper.create(input);
    return res.status(201).json({ data: row });
  }

  /**
 * Update a record by ID
 * This method updates a record in the database using the datamapper's update method.
 * @param {Object} req - The Express request object
 * @param {Object} req.params - The request parameters
 * @param {string} req.params.id - The ID of the entity to update
 * @param {Object} req.body - The request body containing the updated data
 * @param {Object} res - The Express response object
 * @param {Function} res.json - The function to send a JSON response
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
 * @param {Object} req - The Express request object
 * @param {Object} req.params - The request parameters
 * @param {string} [req.params.id] - The ID of the entity to delete. Defaults to the user's ID if not provided.
 * @param {Object} req.user - The user object
 * @param {string} req.user.id - The ID of the user
 * @param {Object} res - The Express response object
 * @param {Function} res.status - The function to set the status code
 * @param {Function} res.json - The function to send a JSON response
 * @param {Function} next - The next middleware function in the Express chain
 * @returns {Promise<Response>} - An empty JSON response with a 204 status code
 */
  static async delete(req, res, next) {
    debug(`[${this.entityName}] calling delete method`);
    const id = req.params.id || req.user.id;
    const deleted = await this.mainDatamapper.delete(id);
    if (!deleted) {
      return next(new ApiError(404, 'Api Error', `${this.entityName} not found`));
    }
    return res.status(204).json();
  }

  /**
 * Deletes an entity by its ID and the user's ID.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the entity to delete.
 * @param {Object} req.user - The user object.
 * @param {string} req.user.id - The ID of the user.
 * @param {Object} res - The response object.
 * @param {Function} res.status - The function to set the status code.
 * @param {Function} res.json - The function to send a JSON response.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} The response status.
 */
  static async deleteByUserId(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = await this.mainDatamapper.deleteByUserId(id, userId);
    if (!deleted) {
      return next(new ApiError(404, 'Api Error', `${this.entityName} not found`));
    }
    return res.status(204).json();
  }
}
