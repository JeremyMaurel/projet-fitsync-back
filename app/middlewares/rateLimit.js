import rateLimit from 'express-rate-limit';

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par 'window' (ici, par 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limite chaque IP à 10 requêtes par 'window' (ici, par 15 minutes)
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

export { globalLimiter, loginLimiter };
