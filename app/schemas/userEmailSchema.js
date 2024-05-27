import Joi from 'joi';

export default Joi.object({
  mail: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
});
