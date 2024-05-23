/* eslint-disable no-underscore-dangle */
import debugMe from 'debug';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';

import router from './app/routers/index.js';
import bodySanitizer from './app/middlewares/bodySanitizer.js';

// These lines and their imports configure the environment
// (dev or prod) as specified in the package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) });

// 'app' is specified in the package.json for configuration
const debug = debugMe('app:server');

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(express.json());

app.use(bodySanitizer);

app.use('/api/v1', router);

app.listen(PORT, () => {
  debug(`Listening on http://localhost:${PORT}`);
});
