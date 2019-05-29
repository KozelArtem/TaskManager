const modelsHelper = require('../utils/modelsHelper');
const models = require('../models');

module.exports = {
    getById: (req, res, next) => {
        models.Task.findByPk(req.params.id, {
                include: [{
                    model: models.Tag,
                    as: 'tags'
                }],
            })
            .then(task => {
                if (!task) {
                    return next({
                        status: 404,
                        message: 'Can not find task with id ' + req.params.id
                    })
                }
                res.status(200).send(task);
            })
            .catch(err => {
                next(err);
            });
    },

    getUserTasks: (req, res, next) => {
        models.Task.findAll({
                where: {
                    userId: req.user.id
                },
                include: [{
                    model: models.Tag,
                    as: 'tags'
                }]
            })
            .then(tasks => {
                res.status(200).send(tasks);
            })
            .catch(err => {
                next(err);
            })
    },

    create: (req, res, next) => {
        modelsHelper.createTaskFromRequest(req)
            .then(task => {
                res.status(201).send(task);
            })
            .catch(err => {
                next(err);
            });
    },

    updateById: (req, res, next) => {
        modelsHelper.updateTaskFromRequest(req)
            .then(result => {
                res.status(200).send({
                    message: 'Task was updated'
                });
            })
            .catch(err => {
                next(err);
            });

    },

    removeById: (req, res, next) => {
        models.Task.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((data) => {
                if (data === 0) {
                    return next({
                        status: 400,
                        message: 'Can not find task with id: ' + req.params.id
                    })
                }
                res.status(200).send({
                    message: 'Task was deleted'
                });
            })
            .catch(err => {
                next(err);
            });
    },
}