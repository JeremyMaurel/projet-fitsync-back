/* eslint-disable consistent-return */
/* eslint-disable max-len */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CoreController from './utils/coreController.js';
import datamappers from '../datamappers/utils/indexDatamapper.js';
import ApiError from '../errors/apiError.js';
import sendEmail from './utils/sendEmail.js';

export default class UserController extends CoreController {
  static entityName = 'user';

  static mainDatamapper = datamappers.userDatamapper;

  /**
   * Get user information by JWT.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   * @param {function} next - The Express next middleware function.
   * @returns {Promise<void>} - Returns a promise that resolves with the response or an error.
   */
  static async getUserByJWT(req, res, next) {
    const userId = req.user.id;

    const user = await this.mainDatamapper.findById(userId);

    if (!user) {
      return next(new ApiError(404, 'Error', 'User not found'));
    }
    return res.json({ data: user });
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
   * @param {function} next - The Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves to sending a JSON response with the created user.
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
   * User login.
   * @param {object} req - The Express request object.
   * @param {object} req.body - The request body containing login data.
   * @param {string} req.body.pseudo - The pseudo of the user.
   * @param {string} req.body.password - The password of the user.
   * @param {object} res - The Express response object.
   * @param {function} next - The Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves to sending a JSON response with a success message.
   */
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

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'Login successful' });
  }

  /**
   * Log out a user by clearing the JWT cookie.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {void}
   */
  static logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  }

  /**
   * Update user information by user ID.
   * @param {object} req - The Express request object.
   * @param {object} req.user - The user object.
   * @param {string} req.user.id - The ID of the user.
   * @param {object} req.body - The request body containing updated user data.
   * @param {object} res - The Express response object.
   * @param {function} next - The Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves to sending a JSON response with the updated user data.
   */
  static async updateUserByUserId(req, res, next) {
    const userId = req.user.id;
    const input = req.body;

    if (input.mail) {
      const existingUserByEmail = await this.mainDatamapper.findByEmail(input.mail);
      if (existingUserByEmail) {
        return next(new ApiError(400, 'Update Error', 'Email already in use'));
      }
    }

    if (input.pseudo) {
      const existingUserByPseudo = await this.mainDatamapper.findByPseudo(input.pseudo);
      if (existingUserByPseudo) {
        return next(new ApiError(400, 'Update Error', 'Pseudo already in use'));
      }
    }

    if (input.password) {
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
      const hashedPassword = await bcrypt.hash(input.password, saltRounds);
      input.password = hashedPassword;
    }

    const row = await this.mainDatamapper.update(userId, input);
    if (!row) {
      return next(new ApiError(404, 'Api Error', `${this.entityName} not found`));
    }
    return res.json({ data: row });
  }

  /**
 * Handles the request to reset a user's password.
 * @param {object} req - The request object from the client.
 * @param {object} req.body - The body of the request.
 * @param {string} req.body.mail - The email address of the user requesting the password reset.
 * @param {object} res - The response object to send the response.
 * @param {function} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves when the password reset link is sent.
 */
  static async requestResetPassword(req, res, next) {
    const { mail } = req.body;
    const user = await this.mainDatamapper.findByEmail(mail);

    if (!user) {
      return next(new ApiError(404, 'User not found', 'No user found with this email'));
    }

    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendEmail(user.mail, 'Password Reset', `Click the link to reset your password: ${resetLink}`);

    res.status(200).json({ message: 'Password reset link sent' });
  }

  /**
 * Handles the reset of a user's password.
 * @param {object} req - The request object from the client.
 * @param {object} req.body - The body of the request.
 * @param {string} req.body.newPassword - The new password to set for the user.
 * @param {object} req.query - The query parameters of the request.
 * @param {string} req.query.token - The JWT token for verifying the password reset request.
 * @param {object} res - The response object to send the response.
 * @param {function} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves when the password is successfully reset.
 */
  static async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const { token } = req.query;

    if (!token) {
      return next(new ApiError(400, 'Invalid Token', 'The token is required'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await this.mainDatamapper.findById(decoded.userId);
    if (!user) {
      return next(new ApiError(404, 'User not found', 'No user found with this ID'));
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await this.mainDatamapper.updatePassword(user.id, hashedPassword);

    res.status(200).json({ message: 'Password successfully reset' });
  }
}
