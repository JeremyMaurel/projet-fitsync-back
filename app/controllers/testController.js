import debugMe from 'debug';
import * as test from '../datamappers/testDatamapper.js';

const debug = debugMe('testController');

export default async function getCategories(req, res) {
  const categories = await test.default();
  debug(categories);
  res.json({ categories });
}
