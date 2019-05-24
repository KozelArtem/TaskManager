const passport = require('passport');

module.exports = {
    needAuth: (req, res, next) => {
        passport.authenticate('jwt', {
            session: false,
            failWithError: true
        }, (err, user, info) => {
            if (err) return next(err);
            if (!user) return next({
                status: 400,
                message: 'Invalid token'
            });

            if (!user.status) {
                return next({
                    status: 400,
                    message: 'Account is not activated'
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return next();
            });
        })(req, res, next);
    },
}