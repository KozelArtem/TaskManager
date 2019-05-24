const {
    check,
} = require('express-validator/check')

const models = require('../models');

const registerValidator = [
    check('email').trim().normalizeEmail()
    .isEmail().withMessage('Must be a valid email.')
    .custom(email => {
        return models.User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user != null) throw new Error('E-mail already in use');
        })
    }),

    check('username').exists()
    .withMessage('Username is required')
    .custom(username => {
        return models.User.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (user != null) throw new Error('Username already in use');
        })
    }),

    check('password')
    .isLength({
        min: 5
    }).withMessage('Password must be at least 5 characters in length.'),

    check('firstName').exists().withMessage('First name is required'),

    check('lastName').exists().withMessage('Last name is required'),
];

const loginValidator = [
    check('username').exists().withMessage('Username is required'),

    check('password').exists().trim().withMessage('Password is required.'),
];

exports.register = registerValidator;
exports.login = loginValidator;