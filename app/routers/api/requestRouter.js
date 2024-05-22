import { Router } from 'express';
import cw from '../../middlewares/controllerWrapper.js';
import RequestController from '../../controllers/requestController.js';
import validator from '../../schemas/middleware/validator.js';
import requestsCreateSchema from '../../schemas/requestsCreateSchema.js';
// import checkById from '../../schemas/middleware/checkById.js';
// import datamappers from '../../datamappers/utils/indexDatamapper.js';

// const { userDatamapper } = datamappers;

const router = Router();

/**
 * @route POST /requests
 * @summary Create a new request.
 * @tags Requests
 * @param {object} request.body.required - The request body - application/json
 * @param {string} request.body.user_id - The ID of the user
 * @param {string} request.body.some_other_field - Another field required for the request
 * @return {object} 201 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.post('/requests', validator(requestsCreateSchema, 'body'), cw(RequestController.createRequestByUserLogged.bind(RequestController)));
// checkById([{ modelInstance: userDatamapper, idKey: 'user_id', entityName: 'User' }]),
export default router;
