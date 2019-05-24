const passport = require('passport');

module.exports = {
    needAuth: (req, res, next) => {
        passport.authenticate('jwt', {
            session: false
        })(req, res, next);
    }
}