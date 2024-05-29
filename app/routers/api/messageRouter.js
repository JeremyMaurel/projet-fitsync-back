import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import MessageController from '../../controllers/messageController.js';
import messageCreateSchema from '../../schemas/messageCreateSchema.js';
import validator from '../../schemas/middleware/validator.js';
import validateToken from '../../middlewares/authentification.js';
import isAdmin from '../../middlewares/adminAuth.js';

const router = Router();
/**
 * @typedef {object} MessagesData
 * @property {number} id - The ID of the message
 * @property {string} mail - The mail of the message sender
 * @property {string} content - The content of the message
 * @property {boolean} is_done - Status of the message
 * @property {timestamptz<string>} created_at - The creation date of the message
 * @property {timestamptz<string>} updated_at - The update date of the message
*/
/**
 * @typedef {object} Messages
 * @property {string} total - Total of messages
 * @property {MessagesData[]} data - An array containing the messages
 */
/**
 * @typedef {object} Message
 * @property {MessagesData} data - An array containing the message
 */
/**
 * @typedef {object} NewMessage
 * @property {string} mail - The mail of the message sender
 * @property {string} content - Th content of the message
 */

/**
 * GET /messages
 * @summary Get all messages
 * @tags Messages
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @return {Messages} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/messages', validateToken, isAdmin, cw(MessageController.getAll.bind(MessageController)));

/**
 * POST /messages
 * @summary Send a new message
 * @tags Messages
 * @security BearerAuth
 * @param {NewMessage} request.body.required - The new message data - application/json
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} mail.string.required - The mail of sender's message
 * @param {string} content.string.required - The content of the message
 * @return {Message} 200 - OK - Successfully logged in with JWT
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.post('/messages', validateToken, validator(messageCreateSchema, 'body'), cw(MessageController.create.bind(MessageController)));

/**
 * DELETE /messages/{id}
 * @summary Deletes the message
 * @tags Messages
 * @security BearerAuth
 * @param {number} id.path.required - The ID ot the message to delete
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @return {void} 204 - No Content - Successfully deleted the account
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.delete('/messages/:id', validateToken, isAdmin, cw(MessageController.delete.bind(MessageController)));

/**
 * GET /messages/{id}
 * @summary Get one messages
 * @tags Messages
 * @security BearerAuth
 * @param {number} id.path.required - The ID of the message to retrive
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @return {Message} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/messages/:id', validateToken, isAdmin, cw(MessageController.getOne.bind(MessageController)));
export default router;
