import Joi from 'joi';

export default Joi.object({
  mail: Joi.string().email({ tlds: { allow: false } }).max(320).required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.max': 'Email must not exceed 320 characters.',
      'any.required': 'Email is required.',
    }),
  pseudo: Joi.string().max(24).required().messages({
    'string.base': 'Pseudo must contains numbers or letters.',
    'string.max': 'Pseudo must not exceed 24 characters.',
    'any.required': 'Pseudo is required.',
  }),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/).required().messages({
    'string.pattern.base': 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    'any.required': 'Password is required.',
  }),
});
