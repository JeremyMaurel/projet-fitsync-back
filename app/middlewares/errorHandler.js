import debugMe from 'debug';

const debug = debugMe('app:middlewares:errorHandler');

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, request, response, next) {
  debug('Error:', err);
  response.status(err.status).json({ status: 'error', name: err.name, message: err.message });
}
