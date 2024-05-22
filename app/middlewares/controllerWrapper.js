import ApiError from '../errors/apiError.js';

/**
 * Controller wrapper middleware
 * This function wraps an Express controller function and handles any errors
 * that occur during its execution by passing them to the next middleware
 * in the chain.
 * @param {Function} controller - The controller function to wrap
 * @returns {Function} Express middleware that wraps the controller
 */
export default function cw(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      const apiError = new ApiError(error.status || 500, error.name || 'Internal Server Error', error.message);
      next(apiError);
    }
  };
}
