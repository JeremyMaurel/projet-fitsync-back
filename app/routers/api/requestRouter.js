import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import RequestController from '../../controllers/requestController.js';
import validator from '../../schemas/middleware/validator.js';
import requestsCreateSchema from '../../schemas/requestsCreateSchema.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();
/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

/**
 * POST /requests
 * @summary Create a new request.
 * @tags Requests
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
export default router;
