import debugMe from 'debug';
import logger from '../docs/logger.js';

const debug = debugMe('app:middlewares:errorHandler');

/**
 * General error handling middleware
 * This function is an Express middleware that handles errors.
 * It sends a JSON response with the error details.
 * @param {Error} err - The error object
 * @param {Request} request - The Express request object
 * @param {Response} response - The Express response object
 * @param {Function} next - The next middleware function in the Express chain
 */
// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  debug('Error:', err);

  logger.error('Api Error', err);
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: err.status,
    name: err.name || 'Error',
    message,
  });
}
