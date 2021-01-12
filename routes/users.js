var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers');


/* GET users listing. */
router.post('/login', userControllers.login); //v 
router.post('/register',userControllers.register);//v
router.post('/generate-password',userControllers.requestNewPassword)

router.put('/:id',userControllers.updatePassword)

router.get('/:id',userControllers.getById);

module.exports = router;
