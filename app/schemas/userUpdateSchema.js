import Joi from 'joi';

export default Joi.object({
  birthdate: Joi.date()
    .messages({ 'date.base': 'Birthdate must be a valid date.' }),
  gender: Joi.string()
    .valid('male', 'female')
    .messages({
      'string.base': 'Gender must be a string.',
      'any.only': 'Gender must be either male or female.',
    }),
  height: Joi.number()
    .integer()
    .messages({
      'number.base': 'Height must be a number.',
      'number.integer': 'Height must be an integer.',
    }),
  objective: Joi.number()
    .integer()
    .messages({
      'number.base': 'Objective must be a number.',
      'number.integer': 'Objective must be an integer.',
    }),
  mail: Joi.string()
    .email({ tlds: { allow: false } })
    .max(320)
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.max': 'Email must not exceed 320 characters.',
    }),
  pseudo: Joi.string()
    .max(24)
    .messages({
      'string.base': 'Pseudo must contains numbers or letters.',
      'string.max': 'Pseudo must not exceed 24 characters.',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .messages({
      'string.pattern.base': 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
})
  .min(1).messages({ 'object.min': 'At least one field must be filled in' });
