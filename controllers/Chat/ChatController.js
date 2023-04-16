const ChatService = require('../../services/Chat/ChatService')
const chatServiceInstance = new ChatService()
// data transfromers
const ChatTransformer = require('../../transformers/Chat/ChatTransformer')

module.exports = {
  accessPersonalChat: async (req, res) => {
    try {
      // We only pass the body object, never the req object
      const response = await chatServiceInstance.accessPersonalChat(req.body)
      if (response.success) {
        const transformedData = await new ChatTransformer().getTransformedData(
          req,
          response.data
        )
        return res.success(transformedData, response.message, 200)
      }
      return res.error(response.data, response.message, 500)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },

  getChats: async (req, res) => {
    try {
      // We only pass the body object, never the req object
      const response = await chatServiceInstance.getChats(req.body)
      if (response.success) {
        const transformedData = await new ChatTransformer().getTransformedData(
          req,
          response.data
        )
        return res.success(transformedData, response.message)
      }
      return res.error(response.data, response.message, 500)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },

  createGroupChat: async (req, res) => {
    try {
      // We only pass the body object, never the req object
      const response = await chatServiceInstance.createGroupChat(req.body)
      if (response.success) {
        const transformedData = await new ChatTransformer().getTransformedData(
          req,
          response.data
        )
        return res.success(transformedData, response.message, 200)
      }
      return res.error(response.data, response.message, 500)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },

  renameGroupChat: async (req, res) => {
    try {
      // We only pass the body object, never the req object
      const response = await chatServiceInstance.renameGroupChat(
        req.params.chatId,
        req.body
      )
      if (response.success) {
        const transformedData = await new ChatTransformer().getTransformedData(
          req,
          response.data
        )
        return res.success(transformedData, response.message, 200)
      }
      return res.error(response.data, response.message, 500)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },

  addToGroup: async (req, res) => {
    try {
      const response = await chatServiceInstance.addUserToGroup(
        req.params.chatId,
        req.body
      )
      if (response.success) {
        const transformedData = await new ChatTransformer().getTransformedData(
          req,
          response.data
        )
        return res.success(transformedData, response.message, 200)
      }
      return res.error(response.data, response.message, 500)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },

  removeFromGroup: async (req, res) => {
    try {
      // We only pass the body object, never the req object
      const response = await chatServiceInstance.removeUserFromGroup(
        req.params.chatId,
        req.body
      )
      if (response.success) {
        const transformedData = await new ChatTransformer().getTransformedData(
          req,
          response.data
        )
        return res.success(transformedData, response.message, 200)
      }

      return res.error(response.data, response.message)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },

  leaveFromGroup: async (req, res) => {
    try {
      // We only pass the body object, never the req object
      const response = await chatServiceInstance.leaveFromGroup(
        req.params.chatId,
        req.body
      )
      if (response.success) {
        return res.success({}, response.message, 200)
      }

      return res.error(response.data, response.message)
    } catch (err) {
      res.error(err, err.name, 500)
    }
  },
}
