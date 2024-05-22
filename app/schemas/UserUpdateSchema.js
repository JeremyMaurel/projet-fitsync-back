// birthdate: Joi.date().optional().messages({
//     'date.base': 'Birthdate must be a valid date.',
//   }),
//   gender: Joi.string().valid('male', 'female').optional().messages({
//     'string.base': 'Gender must be a string.',
//     'any.only': 'Gender must be either male or female.',
//   }),
//   height: Joi.number().integer().optional().messages({
//     'number.base': 'Height must be a number.',
//     'number.integer': 'Height must be an integer.',
//   }),
//   objective: Joi.number().integer().optional().messages({
//     'number.base': 'Objective must be a number.',
//     'number.integer': 'Objective must be an integer.',
//   }),