import { Router } from 'express';

import signUpRouter from './api/signUpRouter.js';
import categoryRouter from './api/categoryRouter.js';
import activityRouter from './api/activityRouter.js';
import testRouter from './api/testRouter.js';

import error404 from '../middlewares/error404Handler.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

// Router principal qui récupère l'ensemble des routers pour la connexion avec Express
router.use(signUpRouter);
router.use(testRouter);
router.use(categoryRouter);
router.use(activityRouter);

// Utilisation du middlewares de gestion 404 si la route demandée n'est pas trouvée
router.use(error404);

// Utilisation du middleware de gestion d'erreurs qui permet d'afficher
// le message d'erreur s'il y en a a un dans un format particulier
router.use(errorHandler);

export default router;
