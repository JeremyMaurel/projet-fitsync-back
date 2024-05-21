import ApiError from '../errors/apiError.js';

/**
 * 404 error handling middleware
 * This function is an Express middleware that handles 404 Not Found errors.
 * It creates an ApiError with a 404 status and a 'Not found' message, then
 * passes it to the next middleware in the chain.
 * @param {Request} _ - The Express request object (unused)
 * @param {Response} __ - The Express response object (unused)
 * @param {Function} next - The next middleware function in the Express chain
 */
export default function error404(_, __, next) {
  next(new ApiError(404, 'Error404', 'Not found'));
}
