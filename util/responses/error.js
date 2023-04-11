module.exports = function (data = {}, message = null, statusCode = 400) {
  // Get access to `req` and `res`
  const req = this.req
  const res = this.res
  let responseData = {}

  responseData.status = false
  responseData.message = message

  if (App.lodash.isObject(data)) {
    if (data.hasOwnProperty('errors')) {
      responseData.errors = data.errors
    } else if (data.hasOwnProperty('message')) {
      responseData.errors = data.message
      //user logger here for "data.stack"
    }
  } else if (App.lodash.isNull(data)) {
    statusCode = 404
  }

  res.status(statusCode)
  return res.json(responseData)
}
