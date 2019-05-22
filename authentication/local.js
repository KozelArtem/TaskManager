const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passportConfig = require('../config/passport.json');
const models = require('../models');

passport.use(new JwtStrategy({
    secretOrKey: passportConfig.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwt_payload, next) => {
    models.User.findByPk(jwt_payload.id)
        .then(user => {
            return next(null, user);
        })
        .catch(err => {
            next(err, false);
        });
}))

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