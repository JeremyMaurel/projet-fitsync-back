/* eslint-disable max-len */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CoreController from './utils/coreController.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';
import getUserIdFromJWT from './utils/getUserIdFromJwt.js';

export default class UserController extends CoreController {
  static entityName = 'user';

  static mainDatamapper = datamappers.userDatamapper;

  /**
 * Retrieves the user associated with the JWT provided in the request headers.
 * This function parses the 'Authorization' header to extract the JWT, decodes it to find the user's ID,
 * and then fetches the user from the database using that ID. If the token is missing, invalid, or the user does not exist,
 * it sends appropriate error responses.
 * @param {Object} req - The HTTP request object, expected to have a JWT in the 'Authorization' header.
 * @param {Object} res - The HTTP response object used to send back the user data or errors.
 * @param {Function} next - The next middleware function in the stack, used for error handling.
 * @returns {Promise<void>} - A promise that resolves by sending a JSON response with user data or handling errors via middleware.
 */
  static async getUserByJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new ApiError(401, 'Authorization Error', 'JWT not provided'));
    }

    const token = authHeader.split(' ')[1];
    // eslint-disable-next-line no-unused-vars
    const secretKey = process.env.JWT_SECRET;

    const userId = getUserIdFromJWT(token);

    if (!userId) {
      return next(new ApiError(401, 'Authorization Error', 'Invalid JWT'));
    }
    const user = await this.mainDatamapper.findById(userId);
    if (!user) {
      return next(new ApiError(404, 'Error', 'User not found'));
    }
    return res.json({ data: user });
  }

  /**
 * Deletes the user's account.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves with a 204 status on success.
 * @throws {ApiError} - Throws an error if the user is not found.
 */
  static async deleteAccount(req, res) {
    const userId = this.getUserIdFromHeader(req, res);

    const userDeleted = await this.mainDatamapper.delete(userId);

    if (!userDeleted) {
      throw new ApiError(404, 'Error', 'User not found');
    }

    return res.status(204).json();
  }

  /**
   * Create a new user with a hashed password.
   * @param {object} req - The Express request object.
   * @param {object} req.body - The request body containing user data.
   * @param {string} req.body.mail - The email of the user.
   * @param {string} req.body.pseudo - The pseudo of the user.
   * @param {string} req.body.password - The password of the user.
   * @param {string} [req.body.role=user] - The role of the user (default: 'user').
   * @param {object} res - The Express response object.
   * @returns {Promise<void>}
   * A promise that resolves to sending a JSON response with the created user.
   */
  // eslint-disable-next-line consistent-return
  static async createUserWithHashedPassword(req, res, next) {
    const {
      password, mail, pseudo,
    } = req.body;

    const existingUserByEmail = await this.mainDatamapper.findByEmail(mail);
    if (existingUserByEmail) {
      return next(new ApiError(400, 'Validation Error', 'Email already in use'));
    }

    const existingUserByPseudo = await this.mainDatamapper.findByPseudo(pseudo);
    if (existingUserByPseudo) {
      return next(new ApiError(400, 'Validation Error', 'Pseudo already in use'));
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await this.mainDatamapper.create({
      mail, pseudo, password: `${hashedPassword}`,
    });
    res.status(201).json(newUser);
  }

  /**
   * Log in a user and return a JWT.
   * @param {object} req - The Express request object.
   * @param {object} req.body - The request body containing login data.
   * @param {string} req.body.pseudo - The pseudo of the user.
   * @param {string} req.body.password - The password of the user.
   * @param {object} res - The Express response object.
   * @param {function} next - The Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves to sending a JSON response with the JWT.
   */
  // eslint-disable-next-line consistent-return
  static async login(req, res, next) {
    const { pseudo, password } = req.body;

    const user = await this.mainDatamapper.findByPseudo(pseudo);
    if (!user) {
      return next(new ApiError(400, 'Autentification Error', 'Invalid pseudo or password'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError(400, 'Autentification Error', 'Invalid pseudo or password'));
    }
    const token = jwt.sign(
      { userId: user.id, pseudo: user.pseudo, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.status(200).json({ token });
  }
}
