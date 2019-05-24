const models = require('../models');
const Op = models.Sequelize.Op;

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
    }
}