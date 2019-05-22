var express = require('express');
var router = express.Router();

const tagsRouter = require('./tags');
const tasksRouter = require('./tasks');
const userRouter = require('./user');

router.use('/tags', tagsRouter);
router.use('/tasks', tasksRouter);
router.use('/user', userRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  
});


module.exports = router;
