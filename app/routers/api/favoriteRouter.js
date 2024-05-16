import { Router } from 'express';
import favoriteController from '../../controllers/favoriteController.js';
import cw from '../../middlewares/controllerWrapper.js';

const router = Router();

router.get('/favorite', cw(favoriteController.getAllFavoriteWithActivitiesByUserId.bind(favoriteController)));

export default router;
