var express = require('express');
var router = express.Router();

const tagsRouter = require('./tags');
const userRouter = require('./user');
const authRouter = require('./auth');

router.use('/tags', tagsRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);


module.exports = router;
