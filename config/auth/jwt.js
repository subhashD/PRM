const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../../database/models/user');
const config = require('../index');
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
    secretOrKey: config.accessTokenSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

const strategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
  // usually this would be a database call:
  User.findOne({email : jwtPayload.email})
  .then((user) => {
      if (user) {
          return next(null, user);
      } else {
          return next(null, false);
      } 
  }).catch((err) => {
      return next(err);
  });
});

passport.use(strategy);

