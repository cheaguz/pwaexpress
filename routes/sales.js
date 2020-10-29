var express = require('express');
var router = express.Router();
var salesControllers = require('../controllers/salesControllers');
const validateAdmin = (req,res,next)=>{req.app.validateAdmin(req,res,next)};
const validateUser = (req,res,next)=>{req.app.validateUser(req,res,next)};

/* GET users listing. */
router.post('/',salesControllers.create);
router.get('/',salesControllers.getAll);
router.get('/:id',salesControllers.getById);
router.delete('/:id',salesControllers.delete);
router.put('/:id',salesControllers.update);
module.exports = router;
