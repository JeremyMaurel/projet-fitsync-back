import Joi from 'joi';

export default Joi.object({
  duration: Joi.number()
    .messages({ 'number.base': 'Duration must be a number in minuts' }),
  date: Joi.date()
    .iso()
    .less('now')
    .messages({
      'date.base': 'You should send a date',
      'date.less': 'Date should be less than today',
    }),
  comment: Joi.string()
    .max(1024)
    .messages({ 'string.max': 'Max size for comment: 1024 caracters' }),
  activityId: Joi.number()
    .integer()
    .messages({ 'number.base': 'The activity\'s id should be a number' }),
})
  .min(1).messages({ 'object.min': 'At least one field must be filled in' });
