const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getAll);
router.get('/:id', tasksController.getById);

router.put('/', tasksController.create);
router.post('/:id', tasksController.updateById);
router.delete('/:id', tasksController.removeById);

module.exports = router;