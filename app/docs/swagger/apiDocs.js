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
  baseDir: `${__dirname}/../../..`, // Ceci devrait pointer vers le dossier 'app' ou la racine de votre projet
  filesPattern: './app/**/*Router.js', // Ajustez ce pattern pour qu'il corresponde à vos fichiers de routeurs
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',
  exposeApiDocs: true,
  apiDocsPath: '/api-docs',
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
export default (app) => expressJSDocSwagger(app)(options);
