// Permet de faire la connection entre express et la BDD
import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool();

export default pool;
