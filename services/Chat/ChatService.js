const BaseService = require('../BaseService')
const config = require('../../config/index')
const ChatRepository = require('../../repositories/ChatRepository') // Chat Database Layer
const mongoose = require('mongoose')

class ChatService extends BaseService {
  /**
   * @description Create an instance of AuthService
   */
  constructor() {
    super()
    // Create instance of Data Access layer using req
    this.repositoryInstance = new ChatRepository()
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param body {object} Object containing all body fields to
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  accessPersonalChat = async (body) => {
    try {
      const findQuery = {
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: body.userId } } },
          { users: { $elemMatch: { $eq: body.loggedInUserId } } },
        ],
      }
      const isChat = await this.repositoryInstance.findOneAndPopulate(
        findQuery,
        ['users']
      )
      if (!App.lodash.isEmpty(isChat)) {
        return { success: true, message: 'Chat fetched!', data: isChat }
      }
      // else create new chat with this user
      const chatData = {
        chatName: 'sender',
        isGroupChat: false,
        users: [body.loggedInUserId, body.userId],
        groupAdmins: [],
      }
      const createdChat = await this.repositoryInstance.create(chatData)

      if (App.lodash.isEmpty(createdChat)) {
        return {
          success: false,
          message: 'Chat creation failed!',
        }
      }
      const chatResponse = await this.repositoryInstance.findOneAndPopulate(
        findQuery,
        ['users']
      )
      return {
        success: true,
        message: 'Chat created successfully!',
        data: chatResponse,
      }
    } catch (err) {
      return { success: false, message: err.name, data: { errors: err } }
    }
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param body {object} Object containing all body fields to
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * @param emailId {objectId} fetch the given email Id
   * find particular email from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  getChats = async (body) => {
    try {
      const result = await this.repositoryInstance.findAndPopulate(
        { users: { $in: [body.loggedInUserId] } },
        ['users']
      )

      if (!App.lodash.isEmpty(result)) {
        return {
          success: true,
          message: 'chats loaded successfully!',
          data: result,
        }
      }
      return {
        success: false,
        message: 'chats not found!',
        data: null,
      }
    } catch (err) {
      return {
        success: false,
        message: 'chats loading failed!',
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
  createGroupChat = async (body) => {
    try {
      // else create new chat with this user
      let groupUsers = [...body.users, body.loggedInUserId]
      const chatData = {
        chatName: body.groupName,
        isGroupChat: true,
        users: groupUsers,
        groupAdmins: [body.loggedInUserId],
      }
      const createdChat = await this.repositoryInstance.create(chatData)

      if (App.lodash.isEmpty(createdChat)) {
        return {
          success: false,
          message: 'Group Chat creation failed!',
        }
      }
      const chatResponse = await this.repositoryInstance.findOneAndPopulate(
        {
          _id: createdChat._id,
        },
        ['users']
      )

      return {
        success: true,
        message: 'Group Chat created successfully!',
        data: chatResponse,
      }
    } catch (err) {
      return { success: false, message: err.name, data: { errors: err } }
    }
  }

  renameGroupChat = async (chatId, chatToUpdate) => {
    try {
      const groupChat = await this.repositoryInstance.findOne({
        _id: chatId,
        isGroupChat: true,
      })

      if (App.lodash.isEmpty(groupChat)) {
        return { success: false, message: 'Group chat not found!' }
      }

      const result = await this.repositoryInstance.update(
        groupChat._id,
        chatToUpdate
      )
      // const result = true;
      if (result) {
        const chatResponse = await this.repositoryInstance.findOneAndPopulate(
          {
            _id: groupChat._id,
          },
          ['users']
        )
        return {
          success: true,
          message: 'Group chat renamed successfully!',
          data: chatResponse,
        }
      }
      return { success: false, message: 'Group chat rename failed!' }
    } catch (err) {
      return { success: false, message: err.name, data: { errors: err } }
    }
  }

  addUserToGroup = async (chatId, body) => {
    try {
      const isExists = await this.repositoryInstance.findOne({
        _id: chatId,
        isGroupChat: true,
        users: { $in: [body.userId] },
      })

      if (isExists) {
        return { success: false, message: 'User already exists in this group!' }
      }
      let findQuery = {
        _id: chatId,
        isGroupChat: true,
        userAdmins: { $elemMatch: { $eq: body.loggedInUserId } },
      }
      let updateQuery = { $push: { users: body.userId } }
      const result = await this.repositoryInstance.findOneAndUpdate(
        findQuery,
        updateQuery
      )
      // const result = true;
      if (result) {
        const chatResponse = await this.repositoryInstance.findOneAndPopulate(
          {
            _id: chatId,
          },
          ['users']
        )
        return {
          success: true,
          message: 'User added successfully!',
          data: chatResponse,
        }
      }
      return { success: false, message: 'User adding failed!' }
    } catch (err) {
      return { success: false, message: err.name, data: err }
    }
  }

  removeUserFromGroup = async (chatId, body) => {
    try {
      let findQuery = {
        _id: chatId,
        isGroupChat: true,
        users: { $in: [body.userId] },
        userAdmins: { $elemMatch: { $eq: body.loggedInUserId } },
      }
      let deleteQuery = {
        $pull: { users: body.userId, userAdmins: body.userId },
      }

      const chatModel = await this.repositoryInstance.findOne(findQuery)

      if (!chatModel) {
        return {
          success: false,
          message: 'User already removed from group!',
          data: null,
        }
      }
      const result = await this.repositoryInstance.update(
        chatModel._id,
        deleteQuery
      )
      // const result = null;
      if (App.lodash.isEmpty(result)) {
        return {
          success: false,
          message: 'User removal failed!',
          data: null,
        }
      }

      const chatResponse = await this.repositoryInstance.findOneAndPopulate(
        {
          _id: chatId,
        },
        ['users']
      )

      return {
        success: true,
        message: 'User removed successfully!',
        data: chatResponse,
      }
    } catch (err) {
      return { success: false, message: err.name, data: { errors: err } }
    }
  }

  leaveFromGroup = async (chatId, body) => {
    try {
      let findQuery = {
        _id: chatId,
        isGroupChat: true,
        users: { $in: [body.loggedInUserId] },
      }
      let deleteQuery = {
        $pull: { users: body.loggedInUserId, userAdmins: body.loggedInUserId },
      }

      const chatModel = await this.repositoryInstance.findOne(findQuery)

      if (!chatModel) {
        return {
          success: false,
          message: 'User not present in group!',
          data: null,
        }
      }
      const result = await this.repositoryInstance.update(
        chatModel._id,
        deleteQuery
      )
      // const result = null;
      if (App.lodash.isEmpty(result)) {
        return {
          success: false,
          message: 'User removal failed!',
          data: null,
        }
      }

      return {
        success: true,
        message: 'User removed successfully!',
      }
    } catch (err) {
      return { success: false, message: err.name, data: { errors: err } }
    }
  }
}

module.exports = ChatService
