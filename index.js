/* eslint-disable no-underscore-dangle */
import debugMe from 'debug';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';

import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import router from './app/routers/index.js';
import bodySanitizer from './app/middlewares/bodySanitizer.js';
import createDoc from './app/docs/swagger/apiDocs.js';
import { globalLimiter } from './app/middlewares/rateLimit.js';
import errorHandler from './app/middlewares/errorHandler.js';
import error404 from './app/middlewares/error404Handler.js';

// These lines and their imports configure the environment
// (dev or prod) as specified in the package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) });

// 'app' is specified in the package.json for configuration
const debug = debugMe('app:server');

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CORS_ORIGIN, credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodySanitizer);

app.use(globalLimiter);

/**
 * GET /api
 * @summary Get documentation
 * @tags Base
 * @return {object} 200 - success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 */
createDoc(app);

app.use('/api/v1', router);
app.use(error404);

// Use the error handling middleware to display error messages in a
// specific format if any errors occur
app.use(errorHandler);

app.listen(PORT, () => {
  debug(`Listening on http://localhost:${PORT}`);
});
