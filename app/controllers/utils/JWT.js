import jwt from 'jsonwebtoken';

export default function createToken() {
  const payload = {
    userId: 1,
  };

  const secretKey = 'prod';

  const token = jwt.sign(payload, secretKey);
  return token;
}
