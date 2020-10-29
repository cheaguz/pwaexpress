var express = require('express');
var router = express.Router();
var categoriesControllers = require('../controllers/categoriesControllers');


/* GET users listing. */
router.get('/', categoriesControllers.getAll);
router.get('/:id', categoriesControllers.getById);
router.post('/', categoriesControllers.create);
router.put('/:id', categoriesControllers.update);
router.delete('/:id', categoriesControllers.delete);

module.exports = router;
