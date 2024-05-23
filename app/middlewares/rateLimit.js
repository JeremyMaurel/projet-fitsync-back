import rateLimit from 'express-rate-limit';

/**
 * Global rate limiter middleware.
 * Limits each IP to 100 requests per 15 minutes.
 * If the limit is exceeded, it returns a 429 status code with an error message.
 * @type {rateLimit}
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par 'window' (ici, par 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

/**
 * Login rate limiter middleware.
 * Limits each IP to 10 login requests per 15 minutes.
 * If the limit is exceeded, it returns a 429 status code with an error message.
 * @type {rateLimit}
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limite chaque IP à 10 requêtes par 'window' (ici, par 15 minutes)
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

export { globalLimiter, loginLimiter };
