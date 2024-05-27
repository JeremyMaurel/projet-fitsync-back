import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import RequestController from '../../controllers/requestController.js';
import validator from '../../schemas/middleware/validator.js';
import requestsCreateSchema from '../../schemas/requestsCreateSchema.js';
import validateToken from '../../middlewares/authentification.js';
import isAdmin from '../../middlewares/adminAuth.js';

const router = Router();

/**
 * @typedef {object} Request
 * @property {number} id - The ID of the request
 * @property {string} name - The name of the request
 * @property {string} intensity - The intensity value of the request
 * @property {number} met - The MET value of the request
 * @property {number} user_id - The ID of the user this request belongs to
 */

/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

/**
 * POST /api/v1/requests
 * @summary Create a new request.
 * @tags Requests
 * @security BearerAuth
 * @param {object} request.body.required - The request body - application/json
 * @param {string} request.body.name - The name of the request
 * @param {string} request.body.intensity - The intensity of the request
 * @param {number} request.body.met - The MET (Metabolic Equivalent of Task) value of the request
 * @return {object} 201 - Created - Successfully created the request
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.post('/requests', validateToken, validator(requestsCreateSchema, 'body'), cw(RequestController.createRequest.bind(RequestController)));

/**
 * GET /requests
 * @summary Get all requests
 * @tags Requests
 * @security BearerAuth
 * @return {Message} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/requests', validateToken, isAdmin, cw(RequestController.getAll.bind(RequestController)));

/**
 * GET /requests/:id
 * @summary Get one request
 * @tags Requests
 * @security BearerAuth
 * @return {Message} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/requests/:id', validateToken, isAdmin, cw(RequestController.getOne.bind(RequestController)));

/**
 * DELETE /requests/:id
 * @summary Deletes the request
 * @tags Requests
 * @security BearerAuth
 * @param {string} authorization.header.required - Bearer token for authorization
 * @return {void} 204 - No Content - Successfully deleted the account
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.delete('/requests/:id', validateToken, isAdmin, cw(RequestController.delete.bind(RequestController)));

export default router;
