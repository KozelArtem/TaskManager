const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const tasksController = require('../controllers/tasks');

const authHelper = require('../utils/auth');


router.get('/', authHelper.needAuth, userController.profile);
router.get('/tasks', authHelper.needAuth, userController.userTasks);
router.put('/tasks', authHelper.needAuth, tasksController.create);
router.get('/tasks/:id', authHelper.needAuth, userController.userTask);
router.post('/tasks/:id', authHelper.needAuth, tasksController.updateById);
router.delete('/tasks/:id', authHelper.needAuth, tasksController.removeById);


module.exports = router;