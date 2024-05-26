/* eslint-disable no-underscore-dangle */
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  info: {
    version: '1.0.0',
    title: 'FitSync',
  },
  baseDir: `${__dirname}/../../..`,
  filesPattern: './app/**/*Router.js',
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',
  exposeApiDocs: true,
  apiDocsPath: '/api-docs',
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
export default (app) => expressJSDocSwagger(app)(options);
