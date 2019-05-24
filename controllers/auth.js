const {
    validationResult
} = require('express-validator/check')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passportConfig = require('../config/passport.json');
const modelsHelper = require('../utils/modelsHelper');

module.exports = {
    login: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next({
                status: 422,
                message: errors.array()
            });
        }
        modelsHelper.findByUsername(req.body.username)
            .then(user => {
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
            })
            .catch(err => {
                next(err);
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
        modelsHelper.createUserFromRequest(req)
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

function generateToken(userId) {
    let payload = {
        id: userId
    }
    let token = jwt.sign(payload, passportConfig.secret);
    return token;
}