const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const models = require('../models');
const Op = models.Sequelize.Op;
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    models.User.findOne({
            where: {
                [Op.or]: [{
                    username: username
                }, {
                    email: username
                }]
            }
        })
        .then(user => {
            if (!user) {
                return done({
                    status: 404,
                    message: 'User not found'
                }, false);
            }
            return done(null, user);
        })
        .catch(err => {
            done(err, false);
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    models.User.findByPk(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, false);
        });
});