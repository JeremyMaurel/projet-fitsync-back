/* eslint-disable max-len */
import { Router } from 'express';

const router = Router();
/**
 * @typedef {object} ActivitiesData
 * @property {number} id - The ID of the activity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET value of the activity
 * @property {number} category_id - The ID of the category
 * @property {timestamptz<string>} created_at - The creation date of the activity
 * @property {timestamptz<string>} updated_at - The update date of the activity
*/
/**
 * @typedef {object} Activities
 * @property {number} total - Total of activities
 * @property {ActivitiesData[]} data - An array containing the activities
 *
 */
/**
 * @typedef {object} Activity
 * @property {ActivitiesData} data - The activity
 */
/**
 * @typedef {object} Void
 */
/**
 * @typedef {object} ApiJsonError
 * @property {string} message - Error message
 * @property {string[]} details - An array containing additional error details
 */

/**
 * @typedef {object} newActivity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET value of the activity
 * @property {number} category_id - The ID of the category this activity
 *
 */

/**
 * @typedef {object} PatchActivity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET value of the activity
 * @property {number} category_id - The ID of the category this activity
 */

/**
 * GET /api/v1/activities
 * @summary Get all activities
 * @tags Activities
 * @return {Activities} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized: JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * GET /api/v1/activities/{id}
 * @summary Get an activity by ID
 * @tags Activities
 * @param {number} id.path.required - The ID of the activity to retrieve
 * @return {Activity} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized: JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */

/**
 * POST /api/v1/activities
 * @summary Create a new activity
 * @tags Activities
 * @security BearerAuth
 * @param {newActivity} request.body.required - The new activity data - application/json
 * @param {string} name.string.required - The name of the activity
 * @param {number} met.number.required - The MET per minuts of the activity
 * @param {number} categoryId.number.required - The categoryId of the activity
 * @return {Activity} 200 - OK Successfully logged in with JWT - application/Json
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * PATCH api/v1/activities/{id}
 * @summary Update a new activity
 * @tags Activities
 * @security BearerAuth
 * @param {number} id.path.required - The ID of the activity to patch
 * @param {PatchActivity} request.body.required - The patched activity data - application/json
 * @param {string} name.string - The name of the activity
 * @param {number} met.number - The MET per minuts of the activity
 * @param {number} categoryId.number - The categoryId of the activity
 * @return {Activity} 200 - OK - Successfully logged in with JWT
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * DELETE api/v1/activities/{id}
 * @summary Delete a new activity
 * @tags Activities
 * @security BearerAuth
 * @param {number} id.path.required - The ID of the activity to delete
 * @return {Void} 204 - No Content  Successfully deleted the activity
 * @return {ApiJsonError} 401 - Unauthorized:- Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - Activity entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
*/

/**
 * @typedef {object} CategoriesData
 * @property {number} id - The ID of the category
 * @property {string} name - The name of the category
 * @property {timestamptz<string>} created_at - The creation date of the category
 * @property {timestamptz<string>} updated_at - The update date of the category
*/
/**
 * @typedef {object} Categories
 * @property {number} total - Total of activities
 * @property {CategoriesData[]} data - An array containing the activities
 *
 */
/**
 * @typedef {object} CategoryData
 * @property {number} id - The ID of the category
 * @property {string} name - The name of the category
 * @property {CategoryActivities} activities - An array containing the category
 */
/**
 * @typedef {object} CategoryActivities
 * @property {number} id - The ID of the activity
 * @property {string} name - The name of the activity
 * @property {number} met - The MET of the activity
 */
/**
 * @typedef {object} Category
 * @property {CategoryData} data - The data of the category
 */

/**
 * GET /api/v1/categories
 * @summary Get all categories
 * @tags Categories
 * @return {Categories} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized: JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */

/**
 * GET /api/v1/categories/{id}
 * @summary Get a category by ID
 * @tags Categories
 * @param {number} id.path.required - The ID of the category to retrieve
 * @return {Category} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized: JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * DELETE /api/v1/favorites/{activityId}
 * @summary Delete a favorite entry by activity ID for an authenticated user
 * @tags Favorites
 * @security BearerAuth
 * @param {number} userId.number.required - The ID of the user
 * @param {number} activityId.number.required - The ID of the activity to be deleted
 * @return {Void} 204 - No Content Successfully deleted the favorite entry
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - Favorite entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
/**
 * POST /api/v1/favorites
 * @summary Create a new favorite entry for an authenticated user
 * @tags Favorites
 * @security BearerAuth
 * @param {newFavorite} request.body.object.required - The request body containing the activity ID
 * @param {number} userId.cookie.required - The ID of the user
 * @param {number} activityId.path.required - The ID of the activity to be favorited
 * @return {Favorite} 201 - Created - Successfully created the favorite entry
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 409 - Conflict - Favorite entry already exists
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
/**
 * @typedef {object} FavoritesData
 * @property {timestamptz<string>} created_at - The creation date of the favorite
 * @property {string} activity_name - The name of the favorite activity
 * @property {number} activity_met - The MET value of the favorite activity
 * @property {number} activity_id - The ID of the favorite activity
*/
/**
 * @typedef {object} Favorites
 * @property {number} total - Total of favorites
 * @property {FavoritesData[]} data - An array containing the favorites
 */
/**
 * @typedef {object} newFavorite
 * @property {number} activityId - The ID of the activity
 */
/**
 * @typedef {object} Favorite
 * @property {FavoritesData} data - The favorite
 */

/**
 * GET /api/v1/favorites
 * @summary Get all favorite activities for an authenticated user
 * @tags Favorites
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @return {Favorites} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - JWT not provided or invalid - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * POST /messages
 * @summary Send a new message
 * @tags Messages
 * @security BearerAuth
 * @param {NewMessage} request.body.required - The new message data - application/json
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} mail.string.required - The mail of sender's message
 * @param {string} content.string.required - The content of the message
 * @return {Message} 200 - OK - Successfully logged in with JWT
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * @typedef {object} MessagesData
 * @property {number} id - The ID of the message
 * @property {string} mail - The mail of the message sender
 * @property {string} content - The content of the message
 * @property {boolean} is_done - Status of the message
 * @property {timestamptz<string>} created_at - The creation date of the message
 * @property {timestamptz<string>} updated_at - The update date of the message
*/
/**
 * @typedef {object} Messages
 * @property {string} total - Total of messages
 * @property {MessagesData[]} data - An array containing the messages
 */
/**
 * @typedef {object} Message
 * @property {MessagesData} data - The message
 */
/**
 * @typedef {object} NewMessage
 * @property {string} mail - The mail of the message sender
 * @property {string} content - Th content of the message
 */

/**
 * GET /messages
 * @summary Get all messages
 * @tags Messages
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @return {Messages} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * DELETE /messages/{id}
 * @summary Deletes the message
 * @tags Messages
 * @security BearerAuth
 * @param {number} id.path.required - The ID ot the message to delete
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @return {Void} 204 - No Content Successfully deleted the account
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * GET /messages/{id}
 * @summary Get one messages
 * @tags Messages
 * @security BearerAuth
 * @param {number} id.path.required - The ID of the message to retrive
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @return {Message} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * @typedef {object} RequestData
 * @property {number} id - The ID of the request
 * @property {string} name - The name of the request
 * @property {string} intensity - The intensity value of the request
 * @property {number} met - The MET value of the request
 * @property {number} user_id - The ID of the user this request belongs to
 * @property {timestamptz<string>} created_at - The creation date of the request
 * @property {timestamptz<string>} updated_at - The update date of the request
 *
*/
/**
 * @typedef {object} newRequest
 * @property {string} name - The name of the request
 * @property {string} intensity - The intensity of the request
 * @property {number} met - The MET value of the request
 */
/**
 * @typedef {object} Request
 * @property {RequestData} data - The request
 *
 */
/**
 * @typedef {object} Requests
 * @property {number} total - Total of requests
 * @property {RequestData[]} data - An array containing the requests
 */

/**
 * POST /api/v1/requests
 * @summary Create a new request
 * @tags Requests
 * @security BearerAuth
 * @param {newRequest} request.body.required - The new request body - application/json
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} name.string.required - The name of the request
 * @param {string} intensity.string.required - The intensity of the request
 * @param {number} met.number.required - The MET value of the request
 * @return {Request} 201 - Created - Successfully created the request
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * GET api/v1/requests
 * @summary Get all requests
 * @tags Requests
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @return {Requests} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * GET api/v1/requests/{id}
 * @summary Get one request
 * @tags Requests
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @param {number} id.path.required - The ID of the request to retrieve
 * @return {Request} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * DELETE /requests/:id
 * @summary Deletes the request
 * @tags Requests
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} userRole.cookie.required - The role of the user
 * @param {number} id.path.required - The ID of the request to delete
 * @return {Void} 204 - No Content Successfully deleted the account
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */

/**
 * @typedef {object} Sessions
 * @property {number} total - Total of sessions
 * @property {SessionData[]} data - An array containing the sessions
 */
/**
 * @typedef {object} Session
 * @property {SessionData} data - The session
 */
/**
 * @typedef {object} newSessionReturned
 * @property {newSessionData} data - The new session
 */
/**
 * @typedef {object} updatedSessionReturned
 * @property {updatedSessionData} data - The updated session
 */
/**
 * @typedef {object} SessionData
 * @property {number} id - The ID of the Session
 * @property {timestamptz<string>} date - The date and time when the session was created
 * @property {number} duration - The duration of the session in minutes
 * @property {string} comment - An optional comment about the session
 * @property {number} activity_name - The ID of the activity this session belongs to
 * @property {number} activity_met - The ID of the user this session belongs to
 */
/**
 * @typedef {object} newSessionData
 * @property {number} id - The ID of the Session
 * @property {timestamptz<string>} date - The date and time when the session was created
 * @property {number} duration - The duration of the session in minutes
 * @property {string} comment - An optional comment about the session
 * @property {number} activity_name - The ID of the activity this session belongs to
 * @property {number} activity_met - The ID of the user this session belongs to
 * @property {timestamptz<string>} created_at - The creation date of the session
 * @property {timestamptz<string>} updated_at - The update date of the session
 */
/**
 * @typedef {object} updatedSessionData
 * @property {number} id - The ID of the Session
 * @property {timestamptz<string>} date - The date and time when the session was created
 * @property {number} duration - The duration of the session in minutes
 * @property {string} comment - An optional comment about the session
 * @property {number} name - The ID of the activity this session belongs to
 * @property {number} met - The ID of the user this session belongs to
 */
/**
 * @typedef {object} newSession
 * @property {number} duration - The duration of the session in minutes
 * @property {timestamptz<string>} date - The date and time when the session was created
 * @property {string} comment - An optionnal comment about the session
 * @property {number} activityId - The ID of the activity
 */

/**
 * GET /api/v1/sessions
 * @summary Get all sessions for an user
 * @tags Sessions
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @return {Sessions} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
   * GET /api/v1/sessions/{id}
   * @summary Get a specific session for an user
   * @tags Sessions
   * @security BearerAuth
   * @param {number} userId.cookie.required - The ID of the user
   * @param {number} id.path.required - The ID of the session to retrieve
   * @return {Session} 200 - Success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
/**
   * DELETE /api/v1/sessions/{id}
   * @summary Deletes a session based on user ID and session ID
   * @tags Sessions
   * @security BearerAuth
   * @param {number} userId.cookie.required - The ID of the user
   * @param {number} id.path.required - The ID of the session to retrieve
   * @return {Void} 204 - No Content - Successfully deleted the session
   * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
   * @return {ApiJsonError} 404 - Not Found - Session entry not found
   * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
   */

/**
 * PATCH /api/v1/sessions/{id}
 * @summary Updates a session based on user ID and session ID
 * @tags Sessions
 * @security BearerAuth
 * @param {newSession} request.body.required - The session data to update (at least one field must be provided)
 * @param {number} userId.cookie.required - The ID of the user
 * @param {number} duration.number - The duration of the session in minutes
 * @param {timestamptz<string>} date.timestamptz - The date and time of the session in the format 'YYYY-MM-DD HH:mm:ss+TZ'
 * @param {string} comment.string - An optional comment about the session
 * @param {number} activityId.number - The ID of the activity associated with the session
 * @return {updatedSessionReturned} 200 - Success response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
 * @return {ApiJsonError} 404 - Not Found - Session entry not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */
/**
 * POST /api/v1/sessions
 * @summary Creates a new session
 * @tags Sessions
 * @security BearerAuth
 * @param {newSession} request.body.required - The new session body
 * @param {number} duration.number.required - The duration of the session in minutes
 * @param {timestamptz<string>} date.timestamptz.required - The date and time of the session in the format 'YYYY-MM-DD HH:mm:ss+TZ'
 * @param {string} comment.string - An optional comment about the session
 * @param {number} userId.cookie.required - The ID of the user
 * @param {number} activityId.number.required - The ID of the activity
 * @return {newSessionReturned} 201 - Created - Successfully created the session
 * @return {ApiJsonError} 400 - Bad Request - Invalid session data provided
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing authorization token
 * @return {ApiJsonError} 404 - Not Found - User or activity not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */

/**
 * @typedef {object} userData
 * @property {number} id - The user ID
 * @property {string} mail - The user email
 * @property {string} pseudo - The user pseudo
 * @property {string} role - The user role
 * @property {timestamptz<string>} birthdate - The user birthdate in the format 'YYYY-MM-DD'
 * @property {string} gender - The user gender (e.g., 'male', 'female', 'other')
 * @property {number} height - The user height in centimeters
 * @property {number} objective - The user's fitness objective
  * @property {timestamptz<string>} created_at - The creation date of the user
 * @property {timestamptz<string>} updated_at - The update date of the user
 */
/**
 * @typedef {object} patchUserBody
 * @property {string} mail - The user email
 * @property {string} pseudo - The user pseudo
 * @property {string} role - The user role
 * @property {string} password - The user password
 * @property {timestamptz<string>} birthdate - The user birthdate in the format 'YYYY-MM-DD'
 * @property {string} gender - The user gender (e.g., 'male', 'female', 'other')
 * @property {number} height - The user height in centimeters
 * @property {number} objective - The user's fitness objective
 */
/**
 * @typedef {object} User
 * @property {userData} data - the user
 */

/**
 * GET /api/v1/users
 * @summary Get user
 * @tags Users
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @return {User} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * DELETE /api/v1/users
 * @summary Deletes the user's account
 * @tags Users
 * @security BearerAuth
 * @param {number} userId.cookie.required - The ID of the user
 * @return {Void} 204 - No Content Successfully deleted the account
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * PATCH /api/v1/users
 * @summary Update user details
 * @tags Users
 * @security BearerAuth
 * @param {patchUserBody} request.body.required - The user data to update: at least one field must be provided - application/json
 * @param {number} userId.cookie.required - The ID of the user
 * @param {string} mail.string - The user email
 * @param {string} pseudo.string - The user pseudo
 * @param {string} role.string - The user role
 * @param {string} password.string - The user password
 * @param {timestamptz<string>} birthdate.timestamptz - The user birthdate in the format 'YYYY-MM-DD'
 * @param {string} gender.string - The user gender (e.g., 'male', 'female', 'other')
 * @param {number} height.number - The user height in centimeters
 * @param {number} objective.number - The user's fitness objective
 * @return {User} 200 - Success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 401 - Unauthorized - application/json
 * @return {ApiJsonError} 404 - Not Found - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * @typedef {object} userSignupBody
 * @property {string} mail - The user email
 * @property {string} pseudo - The user pseudo
 * @property {string} role - The user role
 * @property {string} password - The user password
 * @property {timestamptz<string>} birthdate - The user birthdate in the format 'YYYY-MM-DD'
 * @property {string} gender - The user gender (e.g., 'male', 'female', 'other')
 * @property {number} height - The user height in centimeters
 * @property {number} objective - The user's fitness objective
 */
/**
 * @typedef {object} userSigned
 * @property {number} id - The user ID
 * @property {string} mail - The user email
 * @property {string} pseudo - The user pseudo
 * @property {string} role - The user role
 * @property {timestamptz<string>} birthdate - The user birthdate in the format 'YYYY-MM-DD'
 * @property {string} gender - The user gender (e.g., 'male', 'female', 'other')
 * @property {number} height - The user height in centimeters
 * @property {number} objective - The user's fitness objective
 * @property {timestamptz<string>} created_at - Date of the user creation
 * @property {timestamptz<string>} updated_at - Date of the user update
 */
/**
 * POST /api/v1/signup
 * @summary Create a new user account
 * @tags Auth
 * @param {userSignupBody} request.body.required - The user data - application/json
 * @param {string} mail.string.required - The user email
 * @param {string} pseudo.string.required - The user pseudo
 * @param {string} password.string.required - The user password
 * @param {timestamptz<string>} birthdate.timestamptz - The user birthdate in the format 'YYYY-MM-DD'
 * @param {string} gender.string - The user gender (e.g., 'male', 'female', 'other')
 * @param {number} height.number - The user height in centimeters
 * @param {number} objective.number - The user's fitness objective
 * @return {userSigned} 201 - Created - Successfully created the user
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
/**
 * @typedef {object} userLoginBody
 * @property {string} pseudo - The user pseudo
 * @property {string} password - The user password
 */
/**
 * @typedef {object} userLoggedResponse
 * @property {string} message - Login message
 * @property {string} role - User role
 */
/**
 * POST /api/v1/login
 * @summary Log in a user and return a JWT
 * @tags Auth
 * @param {userLoginBody} request.body.required - The login data - application/json
 * @param {string} pseudo.string.required - The pseudo of the user
 * @param {string} password.string.required - The password of the user
 * @return {userLoggedResponse} 200 - OK - Successfully logged in with JWT
 * @return {ApiJsonError} 400 - Bad Request - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */

/**
 * POST /api/v1/logout
 * @summary Log out a user by clearing the JWT cookie
 * @tags Auth
 * @security BearerAuth
 * @return {Void} 200 - OK Successfully logged out
 */
/**
 * @typedef {object} requestResetBody
 * @property {string} mail - user mail
 */
/**
 * POST /api/v1/requestReset
 * @summary Request a password reset for a user
 * @tags Auth
 * @param {requestResetBody} request.body.required - The email data - application/json
 * @param {string} mail.string.required - The email of the user
 * @return {object} 200 - OK - Successfully sent reset password email
 * @return {ApiJsonError} 400 - Bad Request - Invalid email format
 * @return {ApiJsonError} 404 - Not Found - No user found with this email
 * @return {ApiJsonError} 500 - Internal Server Error - Error while sending email
 */

/**
 * @typedef {object} resetPasswordBody
 * @property {string} newPassword - the new password
 */
/**
 * POST /api/v1/resetPassword
 * @summary Reset the user's password
 * @tags Auth
 * @param {resetPasswordBody} request.body.required - The reset password data - application/json
 * @param {string} newPassword.string.required - The new password of the user
 * @param {string} token.query.required - The JWT token for resetting the password
 * @return {object} 200 - OK - Successfully reset the password
 * @return {ApiJsonError} 400 - Bad Request - Invalid or expired token, or invalid password format
 * @return {ApiJsonError} 404 - Not Found - No user found with this token
 * @return {ApiJsonError} 500 - Internal Server Error - Error while resetting password
 */

/**
 * @typedef {object} UserWeightBody
 * @property {timestamptz<string>} date - The weighing date
 * @property {number} weight - The weight value
 */
/**
 * @typedef {object} UserWeightReturnedData
 * @property {number} id - The userWeight ID
 * @property {number} weight_id - The weight ID
 * @property {number} user_id - The user ID
 * @property {timestamptz<string>} date - the weighing date
 * @property {timestamptz<string>} created_at - the creation date of the userWeight
 * @property {timestamptz<string>} updated_at - the update date of the userWeight
 * @property {string} weight - the value of the weight
 */
/**
 * @typedef {object} UserWeightReturned
 * @property {UserWeightReturnedData} data - the userWeight created
 */

/**
 * POST /api/v1/weight
 * @summary Creates a new weight entry for an user
 * @tags UserWeight
 * @security BearerAuth
 * @param {UserWeightBody} request.body.required - The user weight data
 * @param {number} weight.number.required - The duration of the session in minutes
 * @param {timestamptz<string>} date.timestamptz.required - The date and time of the session in the format 'YYYY-MM-DD HH:mm:ss+TZ'
 * @param {number} userId.cookie.required - The ID of the user
 * @return {UserWeightReturned} 201 - Created - Successfully created the session
 * @return {ApiJsonError} 400 - Bad Request - Invalid session data provided
 * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing authorization token
 * @return {ApiJsonError} 404 - Not Found - User or activity not found
 * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
 */

/**
 * @typedef {object} UserWeight
 * @property {number} total - Total of userWeight
 * @property {userWeightData[]} data - An array containing the userWeight
 */
/**
 * @typedef {object} userWeightData
 * @property {string} value - The weight of the user
 * @property {timestamptz<string>} date - The date of weighing
 * @property {number} user_id - The user ID
 * @property {number} id - the userWeight id
 */
/**
   * GET /api/v1/weight
   * @summary Get all the weight for an user
   * @tags UserWeight
   * @security BearerAuth
   * @param {number} userId.cookie.required - The ID of the user
   * @return {UserWeight[]} 200 - Success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
   * @return {ApiJsonError} 404 - Not Found - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */

/**
   * DELETE /api/v1/weight/{id}
   * @summary Deletes a user weight based on user ID and userWeight ID
   * @tags UserWeight
   * @security BearerAuth
   * @param {number} userId.cookie.required - The ID of the user
   * @param {number} id.path.required - The ID of the userWeight
   * @return {Void} 204 - No Content Successfully deleted the user weight
   * @return {ApiJsonError} 401 - Unauthorized - Invalid or missing token
   * @return {ApiJsonError} 404 - Not Found - Session entry not found
   * @return {ApiJsonError} 500 - Internal Server Error - Unexpected error
   */
export default router;
