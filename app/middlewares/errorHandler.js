import debugMe from 'debug';

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
export default function errorHandler(err, request, response, next) {
  debug('Error:', err);
  response.status(err.status).json({ status: 'error', name: err.name, message: err.message });
}
