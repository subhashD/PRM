const configurator = require('./configurator')

const middlewares = (app) => {
  /**
   * Common Middlewares.
   */
  configurator.general(app)
  configurator.requestInterceptor(app)
  configurator.responses(app)

  // For adding user info in the global req object per session
  configurator.auth.userLogin(app)

  return app
}

module.exports = middlewares
