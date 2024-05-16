import { Router } from 'express';
import testController from '../../controllers/testController.js';

const router = Router();

router.get('/test', testController.getAll.bind(testController));
router.get('/test/:id', testController.getOne.bind(testController));

export default router;

// import { Router } from 'express';
// import login from '../../controllers/loginController.js';
// import * as test from '../../controllers/testController.js';
// import cw from '../../middlewares/controllerWrapper.js';

// const router = Router();

// router.post('/login', login);
// router.get('/test', cw(test.default));

// export default router;
