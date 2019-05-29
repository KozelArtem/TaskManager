const modelsHelper = require('../utils/modelsHelper');
const models = require('../models');

module.exports = {
    getById: (req, res, next) => {
        models.Task.findByPk(req.params.id, {
                include: [{
                    model: models.Tag,
                    as: 'tags',
                    attributes: ["id", "name"],
                    through: {
                        attributes: []
                    }
                }]
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

    list: (req, res, next) => {
        models.Task.findAll({
                where: {
                    userId: req.user.id
                },
                include: [{
                    model: models.Tag,
                    as: 'tags',
                    attributes: ["id", "name"],
                    through: {
                        attributes: []
                    }
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

    update: (req, res, next) => {
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

    remove: (req, res, next) => {
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

    complete: (req, res, next) => {
        models.Task.findByPk(req.params.id)
            .then(task => {
                if (!task) {
                    return next({
                        message: `Can not find task with id: ${req.parmas.id}`,
                        status: 400
                    });
                }
                if (task.completed) {
                    return next({
                        message: `Task already completed`,
                        status: 400
                    });
                }
                task.completed = true;
                task.completedAt = new Date();
                task.save()
                    .then(() => {
                        return res.status(200).send({
                            message: 'Task completed'
                        });
                    })
                    .catch(err => {
                        next(err);
                    })
            })
            .catch(err => {
                next(err);
            })
    },

    completedList: (req, res, next) => {
        models.Task.findAll({
                where: {
                    completed: true
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
            });
    }
}