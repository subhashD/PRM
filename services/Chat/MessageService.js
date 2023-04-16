const BaseService = require('../BaseService')
const config = require('../../config/index')
const MessageRepository = require('../../repositories/MessageRepository') // Chat Database Layer

class MessageService extends BaseService {
  /**
   * @description Create an instance of AuthService
   */
  constructor() {
    super()
    // Create instance of Data Access layer using req
    this.repositoryInstance = new MessageRepository()
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * @param emailId {objectId} fetch the given email Id
   * find particular email from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  getMessages = async (chatId) => {
    try {
      const result = await this.repositoryInstance.findAndPopulate(
        { chat: chatId },
        ['chat', 'sender']
      )

      if (!App.lodash.isEmpty(result)) {
        return {
          success: true,
          message: 'Messages loaded successfully!',
          data: result,
        }
      }
      return {
        success: false,
        message: 'There are no messages yet!',
        data: null,
      }
    } catch (err) {
      return {
        success: false,
        message: 'messages loading failed!',
        data: { errors: err },
      }
    }
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  postMessage = async (chatId, body) => {
    try {
      // else create new chat with this user
      const messageData = {
        sender: body.loggedInUserId,
        chat: chatId,
        content: body.content,
      }
      const createdMessage = await this.repositoryInstance.create(messageData)

      if (App.lodash.isEmpty(createdMessage)) {
        return {
          success: false,
          message: 'failed to send message!',
        }
      }

      const messageResponse = await this.repositoryInstance.findOneAndPopulate(
        { _id: createdMessage._id },
        ['chat', 'sender']
      )

      return {
        success: true,
        message: 'Message sent successfully!',
        data: messageResponse,
      }
    } catch (err) {
      return { success: false, message: err.name, data: { errors: err } }
    }
  }
}

module.exports = MessageService
