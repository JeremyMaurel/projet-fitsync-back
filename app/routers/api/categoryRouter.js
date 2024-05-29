import { Router } from 'express';
import CategoryController from '../../controllers/categoryController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

router.get('/categories', cw(CategoryController.getAll.bind(CategoryController)));

router.get('/categories/:categoryId', cw(CategoryController.getCategoryWithActivities.bind(CategoryController)));

export default router;
