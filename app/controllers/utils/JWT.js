import jwt from 'jsonwebtoken';

/**
 * Creates a JSON Web Token (JWT) with the provided user ID.
 * @param {number} userId - The ID of the user for whom the token is being created.
 * @returns {string} - The generated JWT.
 */
export default function createToken() {
  const payload = {
    userId: 1,
  };

  const secretKey = 'prod';

  const token = jwt.sign(payload, secretKey);
  console.log(token);
  return token;
}

createToken();

// export default function createToken(userId) {
//   const payload = {
//     userId: userId,
//   };

//   const secretKey = 'prod';

//   const token = jwt.sign(payload, secretKey);
//   return token;
// }
