const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const tasksController = require('../controllers/tasks');

const authHelper = require('../utils/auth');


router.get('/', authHelper.needAuth, userController.profile);
router.get('/tasks', authHelper.needAuth, tasksController.getUserTasks);


module.exports = router;