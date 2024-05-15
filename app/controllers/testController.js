import debugMe from 'debug';
import test from '../datamappers/testDatamapper.js';

const debug = debugMe('testController');

const testController = {
  async getCategories(req, res) {
    const categories = await test.getAllCategories();
    debug(categories);
    res.json({ categories });
  },
};

export default testController;
