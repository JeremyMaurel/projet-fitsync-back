import debug from 'debug';
import 'dotenv/config';
import express from 'express';
import { router } from './app/routers';

const app = express();

app.use(express.json);

app.use('/api/v1', router);

const PORT = process.env.PORT ?? 5000;

// on lance le serveur
app.listen(PORT, () => {
  debug('Listening on http://localhost:PORT');
});
