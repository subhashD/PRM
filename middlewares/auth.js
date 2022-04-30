const passport = require('passport');

module.exports = {

    // jwt: passport.authenticate("jwt", App.config.jwtSession),
    jwt: passport.authenticate('jwt', { session: false }),

};