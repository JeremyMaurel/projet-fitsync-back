import ApiError from '../../errors/apiError.js';

const checkById = (checks) => async (req, res, next) => {
  try {
    const promises = checks.map(async (check) => {
      const { modelInstance, idKey, entityName } = check;
      const id = req.params[idKey] || req.body[idKey] || req.query[idKey];
      if (!id) {
        throw new ApiError(400, 'ValidationError', `${idKey} is required`);
      }
      const row = await modelInstance.findById(id);
      if (!row) {
        throw new ApiError(404, `${entityName} not found`);
      }
      req[entityName.toLowerCase()] = row;
    });
    await Promise.all(promises);
    next();
  } catch (error) {
    next(error);
  }
};

export default checkById;
