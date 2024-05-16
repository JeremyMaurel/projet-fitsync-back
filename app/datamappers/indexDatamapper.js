import pool from './client.js';

import TestDatamapper from './testDatamapper.js';

const testDatamapper = new TestDatamapper(pool);

export default testDatamapper;
