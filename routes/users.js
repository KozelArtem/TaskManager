var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');

router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.get('/logout', usersController.logout);

module.exports = router;