const ApplicationError = require('../util/errors/ApplicationError')

class Transformer {
  constructor() {
    if (this.constructor === Transformer) {
      throw new TypeError(
        'Abstract class "Transformer" cannot be instantiated directly.'
      )
    }
    this.req = null
    this.data = null
    this.transformOptions = null
  }

  async getTransformedData(req, data, transformOptions = null) {
    this.req = req
    this.data = data
    this.transformOptions = transformOptions
    this.paramKey = App.helpers.config('settings.transformer.paramKey')
    // this.params = req.getParam(this.paramKey)
    this.params = ''
    this.allQueryParams = !App.lodash.isEmpty(this.params)
      ? this.params.split(',').filter(Boolean)
      : []

    if (App.lodash.isEmpty(data)) {
      if (App.lodash.isNull(data) || App.lodash.isArray(data)) return data
      return {}
    }

    if (App.lodash.isArray(data)) {
      let returnArr = data.map((result) => {
        return this.transform(result)
      })
      return await Promise.all(returnArr)
    }
    return this.transform(data)
  }

  /**
   * Implementation required
   */
  async transform(result) {
    throw new TypeError('You have to implement the method "transform()"')
  }
}

module.exports = Transformer
