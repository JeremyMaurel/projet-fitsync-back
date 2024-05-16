import { Router } from 'express';
import testController from '../../controllers/testController.js';

const router = Router();

router.get('/test', testController.getAll.bind(testController));
router.get('/test/:id', testController.getOne.bind(testController));

export default router;
