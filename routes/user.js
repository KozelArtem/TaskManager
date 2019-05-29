const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

const tasksRouter = require('./tasks');

const authHelper = require('../utils/auth');

router.use('/tasks', authHelper.needAuth, tasksRouter)
router.get('/', authHelper.needAuth, userController.profile);


module.exports = router;