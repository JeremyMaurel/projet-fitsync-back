import ApiError from '../../errors/apiError.js';

export default function validate(schema, source) {
  return (request, response, next) => {
    const { error } = schema.validate(request[source]);
    if (error) {
      const apiError = new ApiError(400, error.name, error.message);
      next(apiError);
    }
    next();
  };
}
