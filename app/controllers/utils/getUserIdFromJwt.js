import jwt from 'jsonwebtoken';

/**
 * Extracts the user ID from a JSON Web Token (JWT).
 * @param {string} token - The JWT from which to extract the user ID.
 * @param {string} secretKey - The secret key used to verify the JWT.
 * @returns {string} - The user ID extracted from the JWT.
 * @throws {Error} - Throws an error if the token is invalid or verification fails.
 */
export default function getUserIdFromJWT(token, secretKey) {
  const decoded = jwt.verify(token, secretKey);
  return decoded.userId;
}
