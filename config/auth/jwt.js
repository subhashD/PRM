const passportJWT = require('passport-jwt');
const User = require('../../models/user');
const config = require('../index');
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const params = {
    secretOrKey: config.accessTokenSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

const applyJwtStrategy = (passport) => {
  const strategy = new JwtStrategy(params, async (jwt_payload, done) => {
      const user = User.findOne({email : jwt_payload.email}, function(err, user) {
        if (err) {
          return done(new Error("UserNotFound"), false);
        } /* else if(jwt_payload.exp<=Date.now()) {
          return done(new Error("TokenExpired"), false);
        } */ else{
          return done(null, user);
        }
      });
  });

  passport.use(strategy);
}

module.exports = applyJwtStrategy;

