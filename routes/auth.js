const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth')
const validator = require('../utils/validator');

router.post('/login', validator.login, authController.login);
router.post('/register', validator.register, authController.register);
router.get('/logout', authController.logout);
router.get('/activation/:code', authController.activate);

module.exports = router;