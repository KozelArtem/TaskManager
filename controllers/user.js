const models = require('../models');
const taskController = require('./tasks');

module.exports = {
    profile: (req, res, next) => {
        res.status(200).send({
            id: req.user.id,
            email: req.user.email,
            username: req.user.username,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        });
    },

    userTask: (req, res, next) => {
        taskController.getById(req,res,next);
    },

    
    userTasks: (req, res, next) => {
        models.Task.findAll({
                where: {
                    userId: req.user.id
                }
            })
            .then(tasks => {
                if (!tasks) {
                    return next({
                        status: 404,
                        message: 'No tasks'
                    });
                }
                res.status(200).send(tasks);
            })
            .catch(err => {
                next(err);
            });
    },
}