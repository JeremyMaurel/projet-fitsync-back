import ApiError from '../../errors/apiError.js';

/**
 * Schema validator middleware
 * This function returns an Express middleware that validates a part of the request
 * (such as the body, parameters, or headers) using the provided schema.
 * @param {Object} schema - The validation schema (typically defined by Joi or a similar library).
 * @param {string} source - The part of the request to validate ('body', 'params', 'query', etc.).
 * @returns {Function} Express middleware that validates the request.
 */
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
