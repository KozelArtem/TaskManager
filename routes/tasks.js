const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');

router.get('/', tasksController.list);
router.get('/:id', tasksController.getById);
router.get('/:id/complete', tasksController.complete);

router.put('/', tasksController.create);
router.post('/:id', tasksController.update);
router.delete('/:id', tasksController.remove);

module.exports = router;