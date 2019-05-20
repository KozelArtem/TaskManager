const express = require('express');
const router = express.Router();

const tagsController = require('../controllers/tags');

router.get('/', tagsController.getAll);
router.get('/:id', tagsController.getById);

router.put('/', tagsController.create);
router.post('/:id', tagsController.updateById);
router.delete('/:id', tagsController.removeById);

module.exports = router;