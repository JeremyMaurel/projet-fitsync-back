/* eslint-disable consistent-return */
import ApiError from '../errors/apiError.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';

const { userDatamapper } = datamappers;

export default async function isAdmin(req, res, next) {
  const userId = req.user.id;
  try {
    const user = await userDatamapper.findById(userId);
    if (!user) { return next(new ApiError(404, 'Authorization Error', 'User not found')); }
    if (user.role !== 'admin') { return next(new ApiError(403, 'Forbidden', 'Access denied')); }
    next();
  } catch (error) {
    return next(new ApiError(error.status, error.name, error.message));
  }
}
