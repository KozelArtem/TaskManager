const jwt = require('jsonwebtoken');
const {
    check,
    validationResult
} = require('express-validator/check')

const models = require('../models');
const passportConfig = require('../config/passport.json');

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

    login: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next({
                status: 208,
                message: 'You are already authorizate'
            });
        }
        findUserByUsername(req.body.username)
            .then(user => {
                if (!user) {
                    return next({
                        status: 400,
                        message: 'Can not find user with username: ' + req.body.username
                    });
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (result) {
                            let token = generateToken(user.id);
                            res.status(200).send({
                                message: 'ok',
                                token: token
                            });
                        } else {
                            next({
                                status: 401,
                                message: 'Incorrect email or password'
                            });
                        }
                    })
                    .catch(err => {
                        next(err);
                    });
            });
    },

    register: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next({
                status: 422,
                message: errors.array()
            });
        }
        createUser(req.body)
            .then(user => {
                return res.status(200).send(user.email);
            })
            .catch(err => {
                next(err);
            });
    },

    logout: (req, res, next) => {
        req.logout();
        res.status(200).send({
            message: 'ok'
        });
    },

}

exports.validate = [
    check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email.')
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
    })
    .withMessage('Password must be at least 5 characters in length.'),

    check('firstName').exists().withMessage('First name is required'),
    check('lastName').exists().withMessage('Last name is required'),
];

function findUserByUsername(username) {
    return models.User.findOne({
        where: {
            [Op.or]: [{
                username: username
            }, {
                email: username
            }]
        }
    })
}

function generateToken(userId) {
    let payload = {
        id: userId
    }
    let token = jwt.sign(payload, passportConfig.secret);
    return token;
}

function createUser(requestBody) {
    models.User.create({
        email: requestBody.email,
        username: requestBody.username,
        password: requestBody.password,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName
    })
}