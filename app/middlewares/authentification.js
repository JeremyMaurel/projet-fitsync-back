/* eslint-disable max-len */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import ApiError from '../errors/apiError.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';

const { userDatamapper } = datamappers;

/**
 * Middleware to validate the JWT and authenticate the user.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 * @returns {Promise<void>} - Returns a promise that resolves to calling the next middleware function.
 * @throws {ApiError} - Throws an error if the JWT is not provided, is invalid, or the user is not found.
 */
export default async function validateToken(req, res, next) {
  const { token: cookieToken } = req.cookies;
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.split(' ')[1];

  const token = cookieToken || headerToken;

  if (!token) {
    return next(new ApiError(401, 'Api Error', 'JWT not provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
    const user = await userDatamapper.findById(userId);
    if (!user) {
      return next(new ApiError(404, 'Authorization Error', 'User not found'));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(error.status, error.name, error.message));
  }
}
