import bcrypt from 'bcryptjs';
import CoreController from './utils/coreController.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';

export default class UserController extends CoreController {
  static entityName = 'user';

  static mainDatamapper = datamappers.userDatamapper;

  /**
 * Retrieves the user by the JWT provided in the request headers.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Returns a promise that resolves with the response or an error.
 */
  static async getUserByJWT(req, res, next) {
    const userId = this.getUserIdFromHeader(req, res);
    const row = await this.mainDatamapper.findById(userId);
    if (!row) {
      return next(new ApiError(404, 'Error', 'User not found'));
    }
    return res.json({ data: row });
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
      password, mail, pseudo, role,
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
      mail, pseudo, role, password: `${hashedPassword}`,
    });
    res.status(201).json(newUser);
  }
}
