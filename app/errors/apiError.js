/**
 * Custom API error class
 * This class extends the built-in Error class to include an HTTP status code
 * along with the error message. It is used to provide more detailed error
 * information in an API context.
 * @class ApiError
 * @extends {Error}
 */
export default class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {number} status - The HTTP status code associated with the error
   * @param {string} message - The error message
   */
  constructor(status, name, message) {
    super(message);
    this.status = status;
    this.name = name;
  }
}
