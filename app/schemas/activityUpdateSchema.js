import Joi from 'joi';

export default Joi.object({
  name: Joi.string().max(256).messages({
    'string.base': 'Invalid input type for name',
    'string.empty': 'Name cannot be empty',
    'string.max': 'Name exceeds maximum length',
  }),
  met: Joi.number().precision(1).min(0.0).max(99.9)
    .messages({
      'number.base': 'Invalid input type for MET',
      'number.precision': 'MET must have at most 1 decimal place',
      'number.min': 'MET is below the minimum value',
      'number.max': 'MET exceeds the maximum value',
    }),
  categoryId: Joi.number().messages({
    'number.base': 'Invalid input type for categoryId',
  }),
}).min(1).messages({ 'object.min': 'At least one field must be filled in' });
