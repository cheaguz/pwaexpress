var express = require('express');
var router = express.Router();
var productsControllers = require('../controllers/productsControllers');

const validate = (req,res,next)=>{req.app.validateAdmin(req,res,next)};

/* GET users listing. */
router.get('/', productsControllers.getAll);
router.get('/:id', productsControllers.getById);
router.post('/', productsControllers.create);
router.put('/:id', productsControllers.update);
router.delete('/:id',productsControllers.delete);
router.get("/categoria/:cat" , productsControllers.getByCategory);

module.exports = router;
