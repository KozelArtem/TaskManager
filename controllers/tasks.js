const models = require('../models');

module.exports = {
    getById: (req, res, next) => {
        models.Task.findByPk(req.params.id).then(task => {
            if (!task) {
                return next({
                    status: 404,
                    message: 'Can not find task with id ' + req.params.id
                })
            }
            res.status(200).send(task);
        }).catch(err => {
            next(err);
        });
    },

    getAll: (req, res, next) => {
        models.Task.findAll().then(tasks => {
            res.status(200).send(tasks);
        }).catch(err => {
            next(err);
        })
    },

    create: (req, res, next) => {
        models.Task.create({
            name: req.body.name,
            description: req.body.description
        }).then(task => {
            res.status(201).send(task);
        }).catch(err => {
            next(err);
        });
    },



    updateById: (req, res, next) => {
        const task = {};
        req.body.name ? task.name = req.body.name : '';
        req.body.description ? task.description = req.body.description : '';
        models.Task.update(task, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).send({
                message: 'Task was deleted'
            });
        }).catch(err => {
            next(err);
        });
    },

    removeById: (req, res, next) => {
        models.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.status(200).send({
                message: 'Task was deleted'
            });
        }).catch(err => {
            next(err);
        });
    }

}