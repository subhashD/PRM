const ObjectId = require('mongoose').Types.ObjectId
const Transformer = require('../Transformer')
const UserTransformer = require('../User/UserTransformer')
const ChatTransformer = require('../Chat/ChatTransformer')

class MessageTransformer extends Transformer {
  /* constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = UserModel;
    } */

  async transform(data) {
    const hasMessage = App.lodash.has(data, '_id')
    let responseData = {}

    if (hasMessage) {
      responseData = {
        id: data._id,
        sender: await new UserTransformer().getTransformedData(
          this.req,
          data.sender
        ),
        chat: await new ChatTransformer().getTransformedData(
          this.req,
          data.chat
        ),
        content: data.content,
        createdAt: App.helpers.formatDate(data.createdAt),
        updatedAt: App.helpers.formatDate(data.updatedAt),
      }
    }

    return App.helpers.cloneObj(responseData)
  }
}

module.exports = MessageTransformer
