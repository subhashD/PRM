const Transformer = require('../Transformer')
const UserModel = require('../../database/models/user')

class UserTransformer extends Transformer {
  /* constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = UserModel;
    } */

  async transform(data) {
    const hasUser = data._id !== null ? true : false
    let userData = {}
    if (hasUser) {
      const hasPhoto = App.lodash.has(data, 'profilePhoto')

      userData = {
        id: data._id,
        fullname: this.getFullName(data),
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        timezone: data.timezone,
        has_photo: hasPhoto ? true : false,
      }
    }

    return App.helpers.cloneObj(userData)
  }

  getFullName(user) {
    if (App.lodash.isEmpty(user.lastname)) {
      return user.firstname
    }
    return `${user.firstname} ${user.lastname}`
  }
}

module.exports = UserTransformer
