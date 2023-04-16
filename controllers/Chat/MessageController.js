const MessageService = require('../../services/Chat/MessageService')
const messageServiceInstance = new MessageService()
// data transfromers
const MessageTransformer = require('../../transformers/Chat/MessageTransformer')

module.exports = {
  getMessages: async (req, res) => {
    try {
      // We only pass the body object, never the req object
      const response = await messageServiceInstance.getMessages(
        req.params.chatId
      )
      if (response.success) {
        const transformedData =
          await new MessageTransformer().getTransformedData(req, response.data)
        return res.success(transformedData, response.message)
      }
      return res.error(response.data, response.message, 500)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },

  postMessage: async (req, res) => {
    try {
      // We only pass the body object, never the req object
      const response = await messageServiceInstance.postMessage(
        req.params.chatId,
        req.body
      )
      if (response.success) {
        const transformedData =
          await new MessageTransformer().getTransformedData(req, response.data)
        return res.success(transformedData, response.message, 200)
      }
      return res.error(response.data, response.message, 500)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },
}
