const { result } = require("lodash");
const GenderModel = require( "../database/models/country" ); // Database Model
const BaseRepository = require("./BaseRepository");

class CountryRepository extends BaseRepository {
    constructor() {
        super();
        this.model = GenderModel;
    }

}

module.exports = CountryRepository;
