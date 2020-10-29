var express = require('express');
var router = express.Router();
var userAdminControllers = require('../controllers/userAdminControllers');


/* GET users listing. */

router.post('/login', userAdminControllers.login);
router.post('/register', userAdminControllers.register);

module.exports = router;
