const chatController = require('../../controllers/Chat/ChatController')

//middleware and contact route prefix
const chatsPrefix = 'chat'
let commonMiddleware = [
  'auth.jwt', // to check if token exists and is valid
]

//sub-routes
const messageRoutes = require('./messages')

module.exports = {
  [`GET ${chatsPrefix}`]: {
    action: chatController.getChats,
    name: 'chat.getChats',
    middlewares: [...commonMiddleware],
  },

  [`POST ${chatsPrefix}/personal`]: {
    action: chatController.accessPersonalChat,
    name: 'chat.accessPersonalChat',
    middlewares: [...commonMiddleware],
  },

  //   [`GET ${chatsPrefix}/personal`]: {
  //     action: chatController.getPersonalChats,
  //     name: 'chat.getPersonalChats',
  //     middlewares: [...commonMiddleware],
  //   },

  [`POST ${chatsPrefix}/group`]: {
    action: chatController.createGroupChat,
    name: 'chat.createGroupChat',
    middlewares: [...commonMiddleware],
  },

  [`PATCH ${chatsPrefix}/group/:chatId`]: {
    action: chatController.renameGroupChat,
    name: 'chat.renameGroupChat',
    middlewares: [...commonMiddleware],
  },

  [`POST ${chatsPrefix}/group/:chatId/add`]: {
    action: chatController.addToGroup,
    name: 'chat.addToGroup',
    middlewares: [...commonMiddleware],
  },

  [`POST ${chatsPrefix}/group/:chatId/remove`]: {
    action: chatController.removeFromGroup,
    name: 'chat.removeFromGroup',
    middlewares: [...commonMiddleware],
  },

  [`DELETE ${chatsPrefix}/group/:chatId/leave`]: {
    action: chatController.leaveFromGroup,
    name: 'chat.leaveFromGroup',
    middlewares: [...commonMiddleware],
  },

  ...messageRoutes,
}
