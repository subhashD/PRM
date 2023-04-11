const ApplicationError = require('./ApplicationError')

class InvalidSecretError extends ApplicationError {
  constructor(message = null, status = 400, customCode = null) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = 'Invalid or no secret key found in header!'

    this.status = status

    this.message = message || this.message

    this.status = status || this.status

    this.customCode = customCode
  }
}

module.exports = InvalidSecretError
