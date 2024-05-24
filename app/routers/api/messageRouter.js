import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import MessageController from '../../controllers/messageController.js';
import messageCreateSchema from '../../schemas/messageCreateSchema.js';
import validator from '../../schemas/middleware/validator.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

/**
 * @typedef {object} Message
 * @property {string} id - The message ID
 * @property {string} email - The message sender's email
 * @property {string} content - The message content
 * @property {string} is_done - The status of the message
 */

/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

/**
 * GET /messages
 * @summary Get all messages
 * @tags Messages
 * @return {Message} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/messages', validateToken, cw(MessageController.getAll.bind(MessageController)));

/**
 * POST /messages
 * @summary Send a new message
 * @tags Messages
 * @param {object} request.body.required - The message data - application/json
 * @param {string} request.body.mail - The mail of sender's message
 * @param {string} request.body.content - The content of the message
 * @return {Message} 200 - OK - Successfully logged in with JWT
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.post('/messages', validateToken, validator(messageCreateSchema, 'body'), cw(MessageController.create.bind(MessageController)));

/**
 * DELETE /messages/{id}
 * @summary Deletes the message
 * @tags Messages
 * @param {string} authorization.header.required - Bearer token for authorization
 * @return {void} 204 - No Content - Successfully deleted the account
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.delete('/messages/:id', validateToken, cw(MessageController.delete.bind(MessageController)));

/**
 * GET /messages/{id}
 * @summary Get one messages
 * @tags Messages
 * @return {Message} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/messages/:id', validateToken, cw(MessageController.getOne.bind(MessageController)));
export default router;
