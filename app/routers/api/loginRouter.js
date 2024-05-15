import { Router } from 'express';
import login from '../../controllers/loginController.js';
import testController from '../../controllers/testController.js';

const router = Router();

router.post('/login', login);
router.get('/test', testController.getCategories);

export default router;
