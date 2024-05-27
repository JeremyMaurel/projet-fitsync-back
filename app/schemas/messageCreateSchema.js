import Joi from 'joi';

export default Joi.object({
  mail: Joi.string()
    .email({ tlds: { allow: false } })
    .max(320)
    .required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.max': 'Email must not exceed 320 characters.',
      'any.required': 'Email is required',
    }),
  content: Joi.string()
    .required()
    .max(2056)
    .messages({
      'string.max': 'Max size for comment: 1024 caracters',
      'any.required': 'Message is required',
    }),
});
