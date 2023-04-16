const UserModel = require('../database/models/user') // Database Model
const BaseRepository = require('./BaseRepository')

class UserRepository extends BaseRepository {
  constructor() {
    super()
    this.model = UserModel
  }

  searchUser(loggedInUserId, keyword) {
    return this.model
      .find({
        $or: [
          { firstname: { $regex: keyword, $options: 'i' } },
          { lastname: { $regex: keyword, $options: 'i' } },
          { email: { $regex: keyword, $options: 'i' } },
        ],
        _id: { $ne: loggedInUserId },
      })
      .exec()
  }
}

module.exports = UserRepository
