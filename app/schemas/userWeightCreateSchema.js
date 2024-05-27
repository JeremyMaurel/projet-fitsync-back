import Joi from 'joi';

export default Joi.object({
  weight: Joi.number().precision(1).prefs({ convert: false }).min(0.0)
    .max(999.9)
    .required()
    .messages({
      'number.base': 'Invalid input type for weight',
      'number.precision': 'weight must have at most 1 decimal place',
      'number.min': 'weight is below the minimum value',
      'number.max': 'weight exceeds the maximum value',
      'any.required': 'weight is required',
    }),
  date: Joi.date()
    .iso()
    .less('now')
    .required()
    .messages({
      'date.base': 'You should send a date',
      'date.less': 'Date should be equal or less than today ',
    }),
});
