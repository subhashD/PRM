const ApplicationError = require('./ApplicationError')

class UnauthorizedError extends ApplicationError {
  constructor(message = null, status = 401, customCode = null) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = 'Unauthorized!'

    this.status = status

    this.message = message || this.message

    this.status = status || this.status

    this.customCode = customCode
  }
}

module.exports = UnauthorizedError
