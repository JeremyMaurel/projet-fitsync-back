import debugMe from 'debug';
import 'dotenv/config';
import express from 'express';
import router from './app/routers/index.js';

const debug = debugMe('app:server');

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());

app.use('/api/v1', router);

app.listen(PORT, () => {
  debug(`Listening on http://localhost:${PORT}`);
});
