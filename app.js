const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const tagsRouter = require('./routes/tags');
const tasksRouter = require('./routes/tasks');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tags', tagsRouter);
app.use('/tasks', tasksRouter);

module.exports = app;
