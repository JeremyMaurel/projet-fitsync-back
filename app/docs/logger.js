import winston from 'winston';

const logger = winston.createLogger({
  level: 'http',
  defaultMeta: { service: 'Fitsync-api' },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log', level: 'info' }),
    new winston.transports.File({ filename: './logs/access.log', level: 'http' }),
  ],
});

export default logger;
