import pool from './client.js';

import TestDatamapper from '../testDatamapper.js';
import UserDatamapper from '../userDatamapper.js';
import SessionDatamapper from '../sessionDatamapper.js';
import FavoriteDatamapper from '../favoriteDatamapper.js';
import ActivityDatamapper from '../activityDatamapper.js';
import CategoryDatamapper from '../categoryDatamapper.js';
import RequestDatamapper from '../requestDatamapper.js';
import WeightTrackingDatamapper from '../weightTrackingDatamapper.js';
import MessageDatamapper from '../messageDatamapper.js';

// Initialize all datamappers with the database connection pool
const testDatamapper = new TestDatamapper(pool);
const userDatamapper = new UserDatamapper(pool);
const sessionDatamapper = new SessionDatamapper(pool);
const favoriteDatamapper = new FavoriteDatamapper(pool);
const activityDatamapper = new ActivityDatamapper(pool);
const categoryDatamapper = new CategoryDatamapper(pool);
const requestDatamapper = new RequestDatamapper(pool);
const weightTrackingDatamapper = new WeightTrackingDatamapper(pool);
const messageDatamapper = new MessageDatamapper(pool);

export default {
  // eslint-disable-next-line max-len
  testDatamapper, userDatamapper, sessionDatamapper, favoriteDatamapper, activityDatamapper, categoryDatamapper, requestDatamapper, weightTrackingDatamapper, messageDatamapper,
};
