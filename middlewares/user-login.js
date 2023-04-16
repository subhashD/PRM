const passport = require('passport')
const UnauthorizedError = require('../util/errors/UnauthorizedError')

module.exports = function (app) {
  app.use((req, res, next) => {
    passport.authenticate(
      'jwt',
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err)
        }

        req['auth'] = {
          isLoggedIn: user ? true : false,
          user: user ? user : null,
        }

        if (user) {
          req.body.loggedInUserId = user._id
        }

        return next()
      }
    )(req, res, next)
  })
}
