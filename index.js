/* eslint-disable no-underscore-dangle */
import debugMe from 'debug';
import dotenv from 'dotenv';
import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

import router from './app/routers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) });

const debug = debugMe('app:server');

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());

app.use('/api/v1', router);

app.listen(PORT, () => {
  debug(`Listening on http://localhost:${PORT}`);
});
