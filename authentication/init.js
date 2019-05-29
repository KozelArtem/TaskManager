const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../config/passport.json');


module.exports = (app) => {
    require('./local');

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // Passport:
    app.use(passport.initialize());
}