const models = require('../models');
const Op = models.Sequelize.Op;

const tagsController = require('../controllers/tags');

module.exports = {
    findByUsername: (username) => {
        return models.User.findOne({
            where: {
                [Op.or]: [{
                    username: username
                }, {
                    email: username
                }]
            }
        }).then(user => {
            if (!user) {
                throw new Error('Can not find user with username: ' + username);
            }
            return user;
        })
    },

    createUserFromRequest: (request) => {
        return models.User.create({
            email: request.body.email,
            username: request.body.username,
            password: request.body.password,
            firstName: request.body.firstName,
            lastName: request.body.lastName
        })
    },

    createTaskFromRequest: async (request) => {
        return models.Task.create({
            name: request.body.name,
            description: request.body.description,
            userId: request.user.id,
        }).then(task => {
            let arr = [];
            for (let i = 0; i < request.body.tags.length; i++) {
                arr[i] = getTag(request.body.tags[i]);
            }
            return Promise.all(arr).then(tags => {
                tags.forEach(tag => {
                    task.addTag(tag);
                });
                return task;
            })
        })
    },

    updateTaskFromRequest: async (request) => {
        const task = {};
        request.body.name ? task.name = request.body.name : '';
        request.body.description ? task.description = request.body.description : '';
        return models.Task.update(task, {
            where: {
                id: request.params.id
            }
        });
    },
}

function getTag(tagName) {
    return tagsController.findByName(tagName)
        .then(tag => {
            if (!tag) {
                return tagsController.create(tagName)
            }
            return tag;
        })
        .catch(err => {
            throw new Error(err.message);
        });
}