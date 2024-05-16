import ApiError from '../errors/apiError.js';

export default function cw(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      const apiError = new ApiError(500, error.name, error.message);
      next(apiError);
    }
  };
}
