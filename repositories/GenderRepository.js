const { result } = require("lodash");
const GenderModel = require( "../database/models/gender" ); // Database Model
const BaseRepository = require("./BaseRepository");

class GenderRepository extends BaseRepository {
    constructor() {
        super();
        this.model = GenderModel;
    }

}

module.exports = GenderRepository;
