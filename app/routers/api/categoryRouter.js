import { Router } from 'express';
import CategoryController from '../../controllers/categoryController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

/**
 * @typedef {object} Category
 * @property {number} id - The ID of the category
 * @property {string} name - The name of the category
 */

/**
 * @typedef {object} Activity
 * @property {number} id - The ID of the activity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET value of the activity
 */

/**
 * @typedef {object} CategoryWithActivities
 * @property {number} id - The ID of the category
 * @property {string} name - The name of the category
 * @property {Activity[]} activities - The list of activities in this category
 */

/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

/**
 * @route GET /categories
 * @summary Get all categories
 * @tags Categories
 * @return {Category[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */

/**
 * @route GET /categories
 * @summary Get all categories
 * @tags Categories
 * @return {Category[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/categories', validateToken, cw(CategoryController.getAll.bind(CategoryController)));

/**
 * GET /categories/{categoryId}
 * @summary Get a category with its activities
 * @tags Categories
 * @param {number} categoryId.path.required - The ID of the category to retrieve
 * @return {CategoryWithActivities} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/categories/:categoryId', validateToken, cw(CategoryController.getCategoryWithActivities.bind(CategoryController)));

export default router;
