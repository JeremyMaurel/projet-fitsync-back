import pool from './client.js';

import TestDatamapper from './testDatamapper.js';
import UserDatamapper from './userDatamapper.js';

const testDatamapper = new TestDatamapper(pool);
const userDatamapper = new UserDatamapper(pool);

export default { testDatamapper, userDatamapper };
