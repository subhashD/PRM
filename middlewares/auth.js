const passport = require('passport');
const config = require('../config/index');
const applyJwtStrategy = require('../config/auth/jwt');

applyJwtStrategy(passport);

const initialize = () => {
    return passport.initialize();
}

const authenticate = () => {
    return passport.authenticate("jwt", config.jwtSession);
}

module.exports = {initialize, authenticate};