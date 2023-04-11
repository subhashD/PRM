const ImportError = require('./ImportError')
const GenericError = require('./GenericError')
const ForbiddenError = require('./ForbiddenError')
const ValidationError = require('./ValidationError')
const UnauthorizedError = require('./UnauthorizedError')
const ModelNotFoundError = require('./ModelNotFoundError')
const InvalidSecretError = require('./InvalidSecretError')
const NotFoundError = require('./NotFoundError')
const logger = require('../Logger/Logger')

module.exports = function (err, req, res, next) {
  // use logger here

  switch (err.constructor) {
    case InvalidSecretError:
      return res.error(err, err.message, err.status)

    case UnauthorizedError:
      return res.error(err, err.message, err.status)

    case ValidationError:
      return res.error(err, err.message, err.status)

    case GenericError:
      return res.error(err, err.message, err.status)

    case ModelNotFoundError:
      return res.error(err, err.message, err.status)

    case ImportError:
      return res.error(err, err.message, err.status)

    case ForbiddenError:
      return res.error(err, err.message, err.status)

    case NotFoundError:
      return res.error(err, err.message, err.status)

    default:
      logger.info(`${err}`)
      if (!App.env.APP_DEBUG) {
        return res.error(
          new Error('Something went wrong, Please try again later!'),
          '',
          500
        )
      }
      return res.error(err, err.message, 500)
  }
}
