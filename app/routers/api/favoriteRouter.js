/* eslint-disable max-len */
import { Router } from 'express';
import favoriteController from '../../controllers/favoriteController.js';
import cw from '../../middlewares/controllerWrapper.js';
import validator from '../../schemas/middleware/validator.js';
import favoriteCreateSchema from '../../schemas/favoriteCreateSchema.js';
import validateToken from '../../middlewares/authentification.js';

const router = Router();

router.get('/favorites', validateToken, cw(favoriteController.getAllFavoriteWithActivitiesByUserId.bind(favoriteController)));

router.post('/favorites', validateToken, validator(favoriteCreateSchema, 'body'), cw(favoriteController.createFavorite.bind(favoriteController)));

router.delete('/favorites/:activityId', validateToken, cw(favoriteController.deleteFavorite.bind(favoriteController)));

export default router;
