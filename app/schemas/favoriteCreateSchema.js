import Joi from 'joi';

export default Joi.object({
  activityId: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Invalid input type for the activity\'s ID',
      'any.required': 'Activity\'s ID is required',
    }),
});
