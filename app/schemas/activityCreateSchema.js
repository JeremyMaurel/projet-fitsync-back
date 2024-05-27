import Joi from 'joi';

export default Joi.object({
  name: Joi.string().max(256).required().messages({
    'string.base': 'Invalid input type for name',
    'string.empty': 'Name cannot be empty',
    'string.max': 'Name exceeds maximum length',
    'any.required': 'Name is required',
  }),
  met: Joi.number().precision(1).prefs({ convert: false }).min(0.0)
    .max(99.9)
    .required()
    .messages({
      'number.base': 'Invalid input type for MET',
      'number.precision': 'MET must have at most 1 decimal place',
      'number.min': 'MET is below the minimum value',
      'number.max': 'MET exceeds the maximum value',
      'any.required': 'MET is required',
    }),
  categoryId: Joi.number().required().messages({
    'number.base': 'Invalid input type for categoryId',
    'any.required': 'CategoryId is required',
  }),
});
