var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers');


/* GET users listing. */
router.post('/login', userControllers.login); //v 
router.post('/register',userControllers.register);//v
router.put('/compras/:id',userControllers.compra);// "compras" : [{"compras": "5f98f324dc0c751474e5590c"}]
router.get('/:id',userControllers.getById);

module.exports = router;
/*
POST - /login
PUT - /user/activate/:hash --- generar token 

*/