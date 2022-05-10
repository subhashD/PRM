const ContactModel = require( "../database/models/contact" ); // Database Model
const BaseRepository = require("./BaseRepository");

class ContactRepository extends BaseRepository {
    constructor() {
        super();
        this.model = ContactModel;
    }

}

module.exports = ContactRepository;
