import ApiError from '../errors/apiError.js';

export default function error404(_, __, next) {
  next(new ApiError(404, 'Not found'));
}
