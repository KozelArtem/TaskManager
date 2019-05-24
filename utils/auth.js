const passport = require('passport');

module.exports = {
    needAuth: (req, res, next) => {
        passport.authenticate('jwt', {
            session: false, 
            failWithError: true
        })(req, res, next);
    }
}