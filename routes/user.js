const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user');
const tasksController = require('../controllers/tasks');

router.get('/', passport.authenticate('jwt', { session: false }), userController.profile);
router.get('/tasks', passport.authenticate('jwt', { session: false }), tasksController.getUserTasks);

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);

module.exports = router;