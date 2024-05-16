import jwt from 'jsonwebtoken';

export default function getUserIdFromJWT(token, secretKey) {
  const decoded = jwt.verify(token, secretKey);
  return decoded.userId;
}
