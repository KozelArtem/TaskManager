const models = require('../models');
const passport = require('passport');

module.exports = {
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            return err ?
                next(err) :
                user ?
                req.logIn(user, (err) => {
                    return err ?
                        next(err) :
                        res.status(202).send();
                }) :
                res.status(401).send();
        })(req, res, next);
    },

    register: (req, res, next) => {
        models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }).then(user => {
            console.log(user);
            console.log(req.user);
            console.log(req.isAuthenticated());
            return res.status(200).send(user.email);
        });
    },

    logout: (req, res, next) => {
        console.log(user);
        console.log(req.user);
        console.log(req.isAuthenticated());
        req.logout();
        res.status(202).send();
    }
}