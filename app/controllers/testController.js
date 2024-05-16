// import debugMe from 'debug';
import CoreController from './coreController.js';
import testDatamapper from '../datamappers/indexDatamapper.js';

// const debug = debugMe('testController');

export default class TestController extends CoreController {
  static entityName = 'category';

  static mainDatamapper = testDatamapper;
}

// export default async function getCategories(req, res) {
//   const categories = await test.findAll();
//   debug(categories);
//   res.json({ categories });
// }
