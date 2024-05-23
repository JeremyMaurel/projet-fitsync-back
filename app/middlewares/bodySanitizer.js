import sanitizeHtml from 'sanitize-html';

/**
 * Middleware to sanitize all string fields in the request body.
 * This function iterates over all keys in the request body and sanitizes any value that is a string
 * to remove potentially harmful HTML content.
 * @param {object} req - The Express request object.
 * @param {object} req.body - The request body containing the data to be sanitized.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 */
export default function bodySanitizer(req, res, next) {
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  });
  next();
}
