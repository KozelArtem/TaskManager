const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('../config/passport.json');


module.exports = (app) => {
    require('./local');

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(session(config.session));

    // Passport:
    app.use(passport.initialize());
    app.use(passport.session());

}