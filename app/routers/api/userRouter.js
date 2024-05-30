/* eslint-disable max-len */
import { Router } from 'express';
import userController from '../../controllers/userController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import userUpdateSchema from '../../schemas/userUpdateSchema.js';
import validateToken from '../../middlewares/authentification.js';
import userCreateSchema from '../../schemas/userCreateSchema.js';
import userEmailSchema from '../../schemas/userEmailSchema.js';
import userPasswordSchema from '../../schemas/userPasswordSchema.js';
import userLoginSchema from '../../schemas/userLoginSchema.js';
import { loginLimiter } from '../../middlewares/rateLimit.js';

const router = Router();

router.get('/users', validateToken, cw(userController.getUserByJWT.bind(userController)));

router.delete('/users', validateToken, cw(userController.delete.bind(userController)));

router.patch('/users', validateToken, validator(userUpdateSchema, 'body'), cw(userController.updateUserByUserId.bind(userController)));

router.post('/logout', validateToken, cw(userController.logout.bind(userController)));

router.post('/signup', validator(userCreateSchema, 'body'), cw(userController.createUserWithHashedPassword.bind(userController)));

router.post('/requestReset', validator(userEmailSchema, 'body'), cw(userController.requestResetPassword.bind(userController)));

router.post('/resetPassword', validator(userPasswordSchema, 'body'), cw(userController.resetPassword.bind(userController)));

router.post('/login', loginLimiter, validator(userLoginSchema, 'body'), cw(userController.login.bind(userController)));

export default router;
