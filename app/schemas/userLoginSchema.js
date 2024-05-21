import Joi from 'joi';

export default Joi.object({
  pseudo: Joi.string().max(24).required().messages({
    'string.base': 'Pseudo must contains numbers or letters.',
    'string.max': 'Pseudo must not exceed 24 characters.',
    'any.required': 'Pseudo is required.',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must contains numbers or letters.',
    'any.required': 'Password is required.',
  }),
});
