import { Router } from 'express';
import CategoryController from '../../controllers/categoryController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

/**
 * GET /categories
 * @summary Get all categories
 * @tags Categories
 * @return {Category[]} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/categories', cw(CategoryController.getAll.bind(CategoryController)));

/**
 * GET /categories/{categoryId}
 * @summary Get a category with its activities
 * @tags Categories
 * @param {number} categoryId.path.required - The ID of the category to retrieve
 * @return {CategoryWithActivities} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
router.get('/categories/:categoryId', cw(CategoryController.getCategoryWithActivities.bind(CategoryController)));

export default router;