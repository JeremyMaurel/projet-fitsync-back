import { Router } from 'express';
import CategoryController from '../../controllers/categoryController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
 * @typedef {object} CategoriesData
 * @property {number} id - The ID of the category
 * @property {string} name - The name of the category
 * @property {timestamptz<string>} created_at - The creation date of the category
 * @property {timestamptz<string>} updated_at - The update date of the category
*/
/**
 * @typedef {object} Categories
 * @property {number} total - Total of activities
 * @property {CategoriesData[]} data - An array containing the activities
 *
 */
/**
 * @typedef {object} CategoryData
 * @property {number} id - The ID of the category
 * @property {string} name - The name of the category
 * @property {CategoryActivities[]} activities - An array containing the category
 */
/**
 * @typedef {object} CategoryActivities
 * @property {number} id - The ID of the activity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET of the activity
 */
/**
 * @typedef {object} Category
 * @property {CategoryData} data - The data of the category
 */

/**
 * GET /api/v1/categories
 * @summary Get all categories
 * @tags Categories
 * @return {Categories} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized: JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/categories', cw(CategoryController.getAll.bind(CategoryController)));

/**
 * GET /api/v1/categories/{id}
 * @summary Get a category by ID
 * @tags Categories
 * @param {number} id.path.required - The ID of the category to retrieve
 * @return {Category} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized: JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/categories/:categoryId', cw(CategoryController.getCategoryWithActivities.bind(CategoryController)));

export default router;
