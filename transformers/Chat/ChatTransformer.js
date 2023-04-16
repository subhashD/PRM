const ObjectId = require('mongoose').Types.ObjectId
const Transformer = require('../Transformer')
const UserTransformer = require('../User/UserTransformer')

class ChatTransformer extends Transformer {
  /* constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = UserModel;
    } */

  async transform(data) {
    const hasChat = App.lodash.has(data, '_id')
    const hasLatestMessage = App.lodash.has(data, 'latestMessage')
    let responseData = {}

    if (hasChat) {
      let chatsUsers = data.users
      // const userExists = data.users.find((u) => u._id === this.req.user._id)

      // if (!userExists) {
      //   chatsUsers.push(this.req.user)
      // }
      responseData = {
        id: data._id,
        chatName: this.getChatName(data),
        isGroupChat: data.isGroupChat,
        latestMessage: hasLatestMessage ? data.latestMessage : null,
        users: await new UserTransformer().getTransformedData(
          this.req,
          chatsUsers
        ),
        groupAdmins: data.groupAdmins,
        createdAt: App.helpers.formatDate(data.createdAt),
        updatedAt: App.helpers.formatDate(data.updatedAt),
      }
    }

    return App.helpers.cloneObj(responseData)
  }

  /* includeGender(data) {
        const GenderTransformer = require('./GenderTransformer');
        return (new GenderTransformer(this.req, data)).init();
    } */

  getChatName = (chat) => {
    if (chat.isGroupChat) {
      return chat.chatName
    }
    const chatUsers = chat.users[0]
    return this.getUserFullName(chatUsers)
  }

  getUserFullName(user) {
    if (App.lodash.isEmpty(user.lastname)) {
      return user.firstname
    }
    return `${user.firstname} ${user.lastname}`
  }
}

module.exports = ChatTransformer
