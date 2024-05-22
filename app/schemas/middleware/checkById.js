import ApiError from '../../errors/apiError.js';

/**
 * Middleware to check the existence of entities by their IDs.
 * This middleware takes an array of checks, where each check specifies the model instance,
 * the ID key to look for in the request, and the entity name.
 * It validates the existence of these entities in the database.
 * @param {Array} checks - An array of check objects.
 * @param {Object} checks[].modelInstance - The instance of the model to use for checking existence.
 * @param {string} checks[].idKey - The key to look for in the request to get the ID (ex:'user_id').
 * @param {string} checks[].entityName - The name of the entity to check (e.g., 'User').
 * @returns {Function} Middleware function to use in Express routes.
 */
export default (checks) => async (req, res, next) => {
  try {
    const promises = checks.map(async (check) => {
      const { modelInstance, idKey, entityName } = check;
      const id = req.params[idKey] || req.body[idKey] || req.query[idKey];
      if (!id) {
        throw new ApiError(400, 'ValidationError', `${idKey} is required`);
      }
      const row = await modelInstance.findById(id);
      if (!row) {
        throw new ApiError(404, 'Api Error', `${entityName} not found`);
      }
      req[entityName.toLowerCase()] = row;
    });
    await Promise.all(promises);
    next();
  } catch (error) {
    next(error);
  }
};
