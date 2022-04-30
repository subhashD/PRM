const UserModel = require( "../database/models/user" ); // Database Model
const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
    constructor() {
        super();
        this.model = UserModel;
    }

}

module.exports = UserRepository;
