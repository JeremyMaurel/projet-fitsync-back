import Joi from 'joi';

export default Joi.object({
  name: Joi.string().max(256).required().messages({
    'string.base': 'Invalid input type for name',
    'string.empty': 'Name cannot be empty',
    'string.max': 'Name exceeds maximum length',
    'any.required': 'Name is required',
  }),
  intensity: Joi.string().valid('low', 'moderate', 'high', 'very high').required().messages({
    'string.base': 'Invalid input type for intensity',
    'any.only': 'Invalid intensity value: should be now, moderate, high or very high',
    'any.required': 'Intensity is required',
  }),
  met: Joi.number().precision(1).min(0.0).max(99.9)
    .required()
    .messages({
      'number.base': 'Invalid input type for MET',
      'number.precision': 'MET must have at most 1 decimal place',
      'number.min': 'MET is below the minimum value',
      'number.max': 'MET exceeds the maximum value',
      'any.required': 'MET is required',
    }),
});
